import _ from "lodash";
import { Op } from "sequelize";
import axios from "axios";
import { getLastUpdateTable, touchLastUpdateTable } from "./MainSyncController";
import Comprobante from "../services/Comprobante";

const options = {
    method: "POST",
    headers: {
        "access-token-galac-fvf" : `${process.env.GALAC_ACCESS_TOKEN}`
    },
};

export const sendComprobanteFromGalac : any = (offset = 0) => {
  console.log("Start sendComprobanteFromGalac iteration: " + offset);
  //let page = +(process.env.QUERY_COMMET_START ?? 0);
  let limit = +(process.env.QUERY_COMMET_LIMIT ?? 25);
  let totalitems = 0;
  const tablename = "comprobante";
  
  return getLastUpdateTable(tablename)
    .then((lastdate) => {
      
        if (lastdate.status != "success") {
        return Promise.reject(lastdate);
      }

      let tmpDate = new Date(lastdate.data);
      tmpDate.setDate(tmpDate.getDate() - 1);

      const strLastDate = 
        tmpDate.getFullYear() + "-" 
        + ((tmpDate.getMonth() + 1) < 10 ? "0" : "") + (tmpDate.getMonth()+1) + "-"
        + (tmpDate.getDate() < 10 ? "0" : "") + tmpDate.getDate();

      //console.log("strLastDate: " + strLastDate);

      return Comprobante.findAndCountAll({
        where: {
          /*ConsecutivoCompania: {
            [Op.in]: [5, 10],
          },*/
          FechaUltimaModificacion: {
                [Op.gte]: strLastDate //"2022-12-01",
              },          
        },
        offset: offset,
        limit: limit,
      });
    })
    .then((resultSQL) => {
     // console.log("Proveedor: " + resultSQL);
      totalitems = resultSQL.count;

      return axios
        .create(options)
        .post(`${process.env.GALAC_AWS_URL}/comprobante`, resultSQL.rows);
    })
    .then((remoteupdated) => {
      if (totalitems > offset + limit) {
        console.log("call sendComprobanteFromGalac offset: " + (offset + limit));
        return sendComprobanteFromGalac(offset + limit);
      }
      console.log(
        "Finish sendComprobanteFromGalac iteraction " + offset + " of " + totalitems
      );

      return touchLastUpdateTable(tablename);

      }).then((touchresponse)=>{


      return Promise.resolve({
        status : touchresponse.status,
        statuscode : touchresponse.statuscode,
        data : "Finish sendComprobanteFromGalac iteraction " + offset + " of " + totalitems
      })
    })
    .catch((e) => {
      
      return Promise.resolve({
        status : "error",
        statuscode : "COM03",
        data : e
      })
    });
};
