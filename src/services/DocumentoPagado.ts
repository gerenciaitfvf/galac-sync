import { DataTypes, Model } from "sequelize";
import { sequelize } from "./connection";

export default class DocumentoPagado extends Model {

    ConsecutivoCompania: number | undefined; // P [int] NOT NULL,
	NumeroComprobante: number | undefined; // P [int] NOT NULL,
	ConsecutivoCxP: number | undefined; //[int] NOT NULL,
	Secuencial: number | undefined; // P [int] NOT NULL,
	NumeroDelDocumentoPagado: string | undefined; // [varchar](25) NULL,
	MontoAbonado: number | undefined; // [money] NULL,
	RetenerIva: string | undefined; // [char](1) NOT NULL,
	MontoIvaRetenido: number | undefined; // [money] NULL,
	CodigoMonedaDeCxP: string | undefined; // [varchar](4) NULL,
	SimboloMonedaDeCxP: string | undefined; // [varchar](4) NULL,
	CambioAMonedaDelPago: number | undefined; // [money] NULL,
	MontoEnMonedaOriginalDeCxP: number | undefined; // [money] NULL,
	MontoRestanteAlDiaDelPago: number | undefined; // [money] NULL,
	MontoTotalDeCxP: number | undefined; // [money] NULL,
	SeHizoLaRetencionIva: string | undefined; // [char](1) NOT NULL,
    fldTimeStamp: number | undefined;// [timestamp] NOT NULL
}

DocumentoPagado.init({
    ConsecutivoCompania: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      NumeroComprobante: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ConsecutivoCxP: {
        type: DataTypes.INTEGER,
    },
    Secuencial: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    NumeroDelDocumentoPagado: {
        type: DataTypes.STRING,
    },
    MontoAbonado: {
        type: DataTypes.DECIMAL,
    },
    RetenerIva: {
        type: DataTypes.STRING,
    },
    MontoIvaRetenido: {
        type: DataTypes.DECIMAL,
    },
    CodigoMonedaDeCxP: {
        type: DataTypes.STRING,
    },
    SimboloMonedaDeCxP: {
        type: DataTypes.STRING,
    },
    CambioAMonedaDelPago: {
        type: DataTypes.DECIMAL,
    },
    MontoEnMonedaOriginalDeCxP: {
        type: DataTypes.DECIMAL,
    },
    MontoRestanteAlDiaDelPago: {
        type: DataTypes.DECIMAL,
    },
    MontoTotalDeCxP: {
        type: DataTypes.DECIMAL,
    },
    SeHizoLaRetencionIva: {
        type: DataTypes.STRING,
    },
    fldTimeStamp: {
        type: DataTypes.INTEGER,
    }
      
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'DocumentoPagado',
	timestamps: false,
    /*
      timestamps: true,
      createdAt: 'date_created',
      updatedAt: 'date_updated',
    */
    freezeTableName: true
});