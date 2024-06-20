
import {sequelize} from './src/services/connection';
import { sendCxPFromGalac } from './src/controller/CxPController';
import { sendProveedorFromGalac } from './src/controller/ProveedorController';
import { sendComprobanteFromGalac } from './src/controller/ComprobanteController';
import { sendMovBankFromGalac } from './src/controller/MovimientoBancarioController';

import dotenv from 'dotenv'; 
import { sendPagoFromGalac } from './src/controller/PagoController';
import { sendCambioFromGalac } from './src/controller/CambioController';
import { sendDocPagadoFromGalac } from './src/controller/DocumentoPagadoController';
dotenv.config();
//console.log(process.env);


    sequelize.authenticate()
    .then(async ()=> {
        console.log('Connection has been established successfully.');

        switch (process.argv[2]) {

            case "galac":
                
                console.log("Start galac process") ;
                //sendMovBankFromGalac()
                sendCxPFromGalac()
                .then((check:any)=>{
                    return sendProveedorFromGalac();
                })
                .then((check:any)=>{
                    return sendComprobanteFromGalac();
                })
                .then((check:any)=>{
                    return sendMovBankFromGalac();
                })
                .then((check:any)=>{
                    return sendPagoFromGalac();
                })
                .then((check:any)=>{
                    return sendCambioFromGalac();
                })
                
               // await sendCxPFromGalac();
                console.log("Finish galac process") ;
                break;
            case "docpagado": 
                await sendDocPagadoFromGalac();
                console.log("Finis galac pago table process")
                break;
            case "cambio": 
                await sendCambioFromGalac();
                console.log("Finis galac cambio table process")
                break;
            default: 
                console.log("no function found")
                break;
        }
        
    })
    /*.then((res:MainControlSync)=>{
        console.log("receive information from database person control");
        //const maincontrolinfo = res; 
        res.comet_total_items = 100;
        res.comet_last_page = 150;
        udpateControlInfo(res);

    })*/
    .catch((error : any)=>{
        console.error('Unable to connect to the database:', error);
    });




 
    
  