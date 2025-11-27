// config do banco usando sequelize com postgree, onde eu importo o sequelize e já jogo as informacoes do bdd.

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('alunoseturmas', 'escolaadmin', 'senha123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false // desativa logs do sequelize no tmnl
})

module.exports = sequelize
