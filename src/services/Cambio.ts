//import _ from "lodash";
import { DataTypes, Model } from "sequelize";
import {sequelize} from './connection';

export default class Cambio extends Model {
  

  CodigoMoneda: string | undefined; // [varchar](4) NOT NULL,
	FechaDeVigencia: any | undefined; // smalldatetime] NOT NULL,
	CambioAMonedaLocal: number | undefined; //  [decimal](30, 5) NOT NULL,
	CambioAMonedaLocalVenta: number | undefined; //  [decimal](30, 5) NOT NULL,
	NombreOperador: string | undefined; //  [varchar](20) NULL,
	FechaUltimaModificacion: any | undefined; //  [smalldatetime] NULL,
	
/*(
	[CodigoMoneda] ASC,
	[FechaDeVigencia] ASC
*/
}

Cambio.init({
  CodigoMoneda: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      FechaDeVigencia: {
        type: DataTypes.DATEONLY,
        primaryKey: true
      },
      CambioAMonedaLocal: {
        type: DataTypes.DECIMAL
      },
      CambioAMonedaLocalVenta: {
        type: DataTypes.DECIMAL
      },
      NombreOperador : {
        type: DataTypes.STRING
      },
      FechaUltimaModificacion: {
        type: DataTypes.DATEONLY
      }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    schema: "Comun", 
    modelName: 'Cambio',
	timestamps: false,
    /*
      timestamps: true,
      createdAt: 'date_created',
      updatedAt: 'date_updated',
    */
    freezeTableName: true
  });