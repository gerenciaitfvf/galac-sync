import _ from "lodash";
import { Op, Sequelize } from "sequelize";
import axios from "axios";
import { getLastUpdateTable, touchLastUpdateTable, touchLastUpdateTableId } from "./MainSyncController";
import Cambio from "../services/Cambio";
import DocumentoPagado from "../services/DocumentoPagado";

const options = {
    method: "POST",
    headers: {
        "access-token-galac-fvf" : `${process.env.GALAC_ACCESS_TOKEN}`
    },
};

export const sendDocPagadoFromGalac : any = (offset = 0, lastidsyncupd = 0) => {
  console.log("Start sendDocPagadoFromGalac iteration: " + offset);
  //let page = +(process.env.QUERY_COMMET_START ?? 0);
  let limit = +(process.env.QUERY_COMMET_LIMIT ?? 25);
  let totalitems = 0;
  let idsyncupdate = lastidsyncupd;
  const tablename = "docpagado";
  
  return getLastUpdateTable(tablename)
    .then((lastdate) => {
      
        if (lastdate.status != "success") {
        return Promise.reject(lastdate);
      }

      let syncdata = lastdate.data;

      console.log("strLastDate: " + syncdata.jinfo.lastid);

      return DocumentoPagado.findAndCountAll({
        attributes:{
          include: [
            [Sequelize.cast(Sequelize.col('fldTimeStamp'), 'bigint'),'fldTimeStamp']
          ],
          exclude: [
            "fldTimeStamp"
          ]
        },
        where: 
        Sequelize.where(
          Sequelize.cast(Sequelize.col('fldTimeStamp'), 'bigint'),
          { [Op.gte]: syncdata.jinfo.lastid }
          /*fldTimeStamp: {
                [Op.gte]: tmpDate.getTime() //"2022-12-01",
              },*/      
        ),
        offset: offset,
        limit: limit,
      });
    })
    .then((resultSQL) => {
      //console.log("Cxp: " + resultSQL.rows[0].ConsecutivoCxp);
      totalitems = resultSQL.count;
      //console.log(resultSQL.rows);

      resultSQL.rows.map( (doc:DocumentoPagado) =>{
        if( !_.isUndefined(doc.fldTimeStamp) && idsyncupdate < doc.fldTimeStamp) {
          idsyncupdate = doc.fldTimeStamp;
        }
      });

      return axios
        .create(options)
        .post(`${process.env.GALAC_AWS_URL}/docpagado`, resultSQL.rows);
    })
    .then((remoteupdated) => {
      if (totalitems > offset + limit) {
        console.log("call sendDocPagadoFromGalac offset: " + (offset + limit));
        return sendDocPagadoFromGalac(offset + limit, idsyncupdate);
      }
      console.log(
        "Finish sendDocPagadoFromGalac iteraction " + offset + " of " + totalitems
      );

      return touchLastUpdateTableId(tablename, idsyncupdate);

      }).then((touchresponse)=>{
        console.log(touchresponse);
        
      return Promise.resolve({
        status :touchresponse.status,
        statuscode : touchresponse.statuscode,
        data: "Finish sendDocPagadoFromGalac iteraction " + offset + " of " + totalitems
      })
    })
    .catch((e) => {
      console.log("error check", e);
    });
};
