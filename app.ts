
import {sequelize} from './src/services/connection';
import { sendCxPFromGalac } from './src/controller/CxPController';

//console.log(process.argv);

    sequelize.authenticate()
    .then(()=>{
        console.log('Connection has been established successfully.');

        switch (process.argv[2]) {

            case "galac":
                console.log("Start parent process sendCxPFromGalac") ;
                sendCxPFromGalac();
                console.log("Finish parent process sendCxPFromGalac") ;
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




 
    
  