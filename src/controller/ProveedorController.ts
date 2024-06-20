import _ from "lodash";
import CxP from "../services/CxP";
import { Op } from "sequelize";
import axios from "axios";
import { getLastUpdateTable, touchLastUpdateTable } from "./MainSyncController";
import Proveedor from "../services/Proveedor";

const options = {
    method: "POST",
    headers: {
        "access-token-galac-fvf" : `${process.env.GALAC_ACCESS_TOKEN}`
    },
};

export const sendProveedorFromGalac : any = (offset = 0) => {
  console.log("Start sendProveedorFromGalac iteration: " + offset);
  //let page = +(process.env.QUERY_COMMET_START ?? 0);
  let limit = +(process.env.QUERY_COMMET_LIMIT ?? 25);
  let totalitems = 0;
  const tablename = "proveedor";
  
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

      //console.log("strLastDate: " + strLastDate);

      return Proveedor.findAndCountAll({
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
     // console.log("Proveedor: " + resultSQL);
      totalitems = resultSQL.count;

      return axios
        .create(options)
        .post(`${process.env.GALAC_AWS_URL}/proveedor`, resultSQL.rows);
    })
    .then((remoteupdated) => {
      if (totalitems > offset + limit) {
        console.log("call sendProveedorFromGalac offset: " + (offset + limit));
        return sendProveedorFromGalac(offset + limit);
      }
      console.log(
        "Finish sendProveedorFromGalac iteraction " + offset + " of " + totalitems
      );

      return touchLastUpdateTable(tablename);

      }).then((touchresponse)=>{
      return Promise.resolve({
        status : touchresponse.status,
        statuscode : touchresponse.statuscode,
        data : "Finish sendProveedorFromGalac iteraction " + offset + " of " + totalitems
      })
    })
    .catch((e) => {
      
      return Promise.resolve({
        status : "error",
        statuscode : "PR03",
        data : e
      })
    });
};
