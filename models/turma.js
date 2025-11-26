// model de turma
// turma tem nome
// aluno vai ter chave estrangeira pra turma, então isso vai ser usado no relacionamento

const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Turma = sequelize.define('Turma', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    turno: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true,   // cria created_at e updated_at
    underscored: true   // usa snake_case
})

module.exports = Turma
