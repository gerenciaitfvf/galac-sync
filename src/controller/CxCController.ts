import _ from "lodash";
import { Op } from "sequelize";
import axios from "axios";
import { getLastUpdateTable, touchLastUpdateTable } from "./MainSyncController";
import CxC from "../services/CxC";

const options = {
    method: "POST",
    headers: {
        "access-token-galac-fvf" : `${process.env.GALAC_ACCESS_TOKEN}`
    },
};

export const sendCxCFromGalac : any = (offset = 0) => {
  console.log("Start sendCxCFromGalac iteration: " + offset);
  //let page = +(process.env.QUERY_COMMET_START ?? 0);
  let limit = +(process.env.QUERY_COMMET_LIMIT ?? 25);
  let totalitems = 0;
  const tablename = "cxc";
  
  return getLastUpdateTable(tablename)
    .then((lastdate) => {
      
        if (lastdate.status != "success") {
        return Promise.reject(lastdate);
      }

      let tmpDate = new Date(lastdate.data.lastdate);
      tmpDate.setDate(tmpDate.getDate() - 1);

      const strLastDate = 
        tmpDate.getFullYear() + "-" 
        + ((tmpDate.getMonth() + 1) < 10 ? "0" : "") + (tmpDate.getMonth()+1) + "-"
        + (tmpDate.getDate() < 10 ? "0" : "") + tmpDate.getDate();

        console.log("strLastDate: " + strLastDate);

      return CxC.findAndCountAll({
        where: {
          ConsecutivoCompania: {
            [Op.in]: [5, 10],
          },
          FechaUltimaModificacion: {
                [Op.gte]: strLastDate //"2022-12-01",
              },          
        },
        offset: offset,
        limit: limit,
      });
    })
    .then((resultSQL) => {
      //console.log("Cxp: " + resultSQL.rows[0].ConsecutivoCxp);
      totalitems = resultSQL.count;

      if(totalitems > 0) {
        resultSQL.rows.map( item =>{
          if(item.Numero == '013285') {
            console.log(item);
          }
        })

        
      }

      return axios
        .create(options)
        .post(`${process.env.GALAC_AWS_URL}/cxc`, resultSQL.rows);
    })
    .then((remoteupdated) => {
      if (totalitems > offset + limit) {
        console.log("call sendCxCFromGalac offset: " + (offset + limit));
        return sendCxCFromGalac(offset + limit);
      }
      console.log(
        "Finish sendCxCFromGalac iteraction " + offset + " of " + totalitems
      );

      return touchLastUpdateTable(tablename);

      }).then((touchresponse)=>{
       // console.log(touchresponse);
        
      return Promise.resolve({
        status :touchresponse.status,
        statuscode : touchresponse.statuscode,
        data: "Finish sendCxCFromGalac iteraction " + offset + " of " + totalitems
      })
    })
    .catch((e) => {
      console.log("error check", e);
    });
};
