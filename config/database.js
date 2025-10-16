import { Sequelize } from 'sequelize';
// O dotenv já foi carregado no server.js, então podemos usar process.env aqui

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, 
  }
);

export default sequelize;