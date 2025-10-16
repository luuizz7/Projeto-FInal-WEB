import { Sequelize } from 'sequelize';

// Substitua 'banco', 'usuario', 'senha' pelas suas credenciais do PostgreSQL
const sequelize = new Sequelize('seu_banco', 'seu_usuario', 'sua_senha', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Desative para não poluir o console com queries SQL
});

export default sequelize;
