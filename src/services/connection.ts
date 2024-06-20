import dotenv from 'dotenv'; 
dotenv.config();

//console.log(process.env);

const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
/*const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
});
*/

// Option 3: Passing parameters separately (other dialects)
export const sequelize = new Sequelize(process.env.DB_NAME, 
    process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  logging: process.env.SEQ_LOG == 'true',
  dialect: process.env.SEQ_DIALECT ?? 'mysql',
  port: process.env.DB_PORT ?? '1433',
  dialectOptions: {
    options: {
      "encrypt": false
    }
  }
});

