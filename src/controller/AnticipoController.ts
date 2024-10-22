import _ from "lodash";
import { Op, Sequelize } from "sequelize";
import axios from "axios";
import { getLastUpdateTable, touchLastUpdateTable, touchLastUpdateTableId } from "./MainSyncController";
import Anticipo from "../services/Anticipo";
import AnticipoPagado from "../services/AnticipoPagado";
import AnticipoCobrado from "../services/AnticipoCobrado";

const options = {
    method: "POST",
    headers: {
        "access-token-galac-fvf" : `${process.env.GALAC_ACCESS_TOKEN}`
    },
};

export const sendAnticipoFromGalac : any = (offset = 0) => {
  console.log("Start sendAnticipoFromGalac iteration: " + offset);
  //let page = +(process.env.QUERY_COMMET_START ?? 0);
  let limit = +(process.env.QUERY_COMMET_LIMIT ?? 25);
  let totalitems = 0;
  const tablename = "anticipo";
  
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

      return Anticipo.findAndCountAll({
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

      return axios
        .create(options)
        .post(`${process.env.GALAC_AWS_URL}/anticipo`, resultSQL.rows);
    })
    .then((remoteupdated) => {
      if (totalitems > offset + limit) {
        console.log("call sendAnticipoFromGalac offset: " + (offset + limit));
        return sendAnticipoFromGalac(offset + limit);
      }
      console.log(
        "Finish sendAnticipoFromGalac iteraction " + offset + " of " + totalitems
      );

      return touchLastUpdateTable(tablename);

      }).then((touchresponse)=>{
       // console.log(touchresponse);
        
      return Promise.resolve({
        status :touchresponse.status,
        statuscode : touchresponse.statuscode,
        data: "Finish sendAnticipoFromGalac iteraction " + offset + " of " + totalitems
      })
    })
    .catch((e) => {
      console.log("error check", e);
    });
};

export const sendAnticipoPagadoFromGalac : any = (offset = 0, lastidsyncupd = 0) => {
  console.log("Start sendAnticipoPagadoFromGalac iteration: " + offset + " lastidsync: " + lastidsyncupd);
  //let page = +(process.env.QUERY_COMMET_START ?? 0);
  let limit = +(process.env.QUERY_COMMET_LIMIT ?? 25);
  let totalitems = 0;
  let idsyncupdate = lastidsyncupd;
  const tablename = "anticipopagado";
  
  return getLastUpdateTable(tablename)
    .then((lastdate) => {
      
        if (lastdate.status != "success") {
        return Promise.reject(lastdate);
      }

      let syncdata = lastdate.data;

      console.log("strLastDate: " + syncdata.jinfo.lastid);

      return AnticipoPagado.findAndCountAll({
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

      resultSQL.rows.map( (doc:AnticipoPagado) =>{

        if( !_.isUndefined(doc.fldTimeStamp) && (idsyncupdate - doc.fldTimeStamp) < 0) {
          //console.log("rowsmap: " + idsyncupdate + " vs " + doc.fldTimeStamp);
          idsyncupdate = doc.fldTimeStamp;
        }
      });

      return axios
        .create(options)
        .post(`${process.env.GALAC_AWS_URL}/anticipopagado`, resultSQL.rows);
    })
    .then((remoteupdated) => {
      if (totalitems > offset + limit) {
        console.log("call sendAnticipoPagadoFromGalac offset: " + (offset + limit));
        return sendAnticipoPagadoFromGalac(offset + limit, idsyncupdate);
      }
      console.log(
        "Finish sendAnticipoPagadoFromGalac iteraction " + offset + " of " + totalitems + " - idsyncupdate: " + idsyncupdate
      );

      return touchLastUpdateTableId(tablename, idsyncupdate);

      }).then((touchresponse)=>{
        //console.log(touchresponse);
        
      return Promise.resolve({
        status :touchresponse.status,
        statuscode : touchresponse.statuscode,
        data: "Finish sendAnticipoPagadoFromGalac iteraction " + offset + " of " + totalitems
      })
    })
    .catch((e) => {
      console.log("error check", e);
    });
};

export const sendAnticipoCobradoFromGalac : any = (offset = 0, lastidsyncupd = 0) => {
  console.log("Start sendAnticipoCobradoFromGalac iteration: " + offset);
  //let page = +(process.env.QUERY_COMMET_START ?? 0);
  let limit = +(process.env.QUERY_COMMET_LIMIT ?? 25);
  let totalitems = 0;
  let idsyncupdate = lastidsyncupd;
  const tablename = "anticipocobrado";
  
  return getLastUpdateTable(tablename)
    .then((lastdate) => {
      
        if (lastdate.status != "success") {
        return Promise.reject(lastdate);
      }

      let syncdata = lastdate.data;

      return AnticipoCobrado.findAndCountAll({
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

      resultSQL.rows.map( (doc:AnticipoCobrado) =>{
        if( !_.isUndefined(doc.fldTimeStamp) && (idsyncupdate - doc.fldTimeStamp) < 0) {
          idsyncupdate = doc.fldTimeStamp;
        }
      });

      return axios
        .create(options)
        .post(`${process.env.GALAC_AWS_URL}/anticipocobrado`, resultSQL.rows);
    })
    .then((remoteupdated) => {
      if (totalitems > offset + limit) {
        console.log("call sendAnticipoCobradoFromGalac offset: " + (offset + limit));
        return sendAnticipoCobradoFromGalac(offset + limit, idsyncupdate);
      }
      console.log(
        "Finish sendAnticipoCobradoFromGalac iteraction " + offset + " of " + totalitems
      );

      return touchLastUpdateTableId(tablename, idsyncupdate);

      }).then((touchresponse)=>{
        console.log(touchresponse);
        
      return Promise.resolve({
        status :touchresponse.status,
        statuscode : touchresponse.statuscode,
        data: "Finish sendAnticipoCobradoFromGalac iteraction " + offset + " of " + totalitems
      })
    })
    .catch((e) => {
      console.log("error check", e);
    });
};