import _ from "lodash";
import { Op } from "sequelize";
import axios from "axios";
import { getLastUpdateTable, touchLastUpdateTable } from "./MainSyncController";
import Pago from "../services/Pago";
import Cambio from "../services/Cambio";

const options = {
    method: "POST",
    headers: {
        "access-token-galac-fvf" : `${process.env.GALAC_ACCESS_TOKEN}`
    },
};

export const sendCambioFromGalac : any = (offset = 0) => {
  console.log("Start sendCambioFromGalac iteration: " + offset);
  //let page = +(process.env.QUERY_COMMET_START ?? 0);
  let limit = +(process.env.QUERY_COMMET_LIMIT ?? 25);
  let totalitems = 0;
  const tablename = "tasacambio";
  
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

      return Cambio.findAndCountAll({
        where: {
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
        .post(`${process.env.GALAC_AWS_URL}/tasacambio`, resultSQL.rows);
    })
    .then((remoteupdated) => {
      if (totalitems > offset + limit) {
        console.log("call sendCambioFromGalac offset: " + (offset + limit));
        return sendCambioFromGalac(offset + limit);
      }
      console.log(
        "Finish sendCambioFromGalac iteraction " + offset + " of " + totalitems
      );

      return touchLastUpdateTable(tablename);

      }).then((touchresponse)=>{
        //console.log(touchresponse);
        
      return Promise.resolve({
        status :touchresponse.status,
        statuscode : touchresponse.statuscode,
        data: "Finish sendCambioFromGalac iteraction " + offset + " of " + totalitems
      })
    })
    .catch((e) => {
      console.log("error check", e);
    });
};
