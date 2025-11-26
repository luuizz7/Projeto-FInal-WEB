// model de aluno
// aluno vai ter nome, email e chave estrangeira da turma
// relacionamento vai ser criado no arquivo associations.js

const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Aluno = sequelize.define('Aluno', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    turma_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'turmas', // nome da tabela
            key: 'id'
        },
        onDelete: 'SET NULL'
    }
}, {
    timestamps: true,   // cria created_at e updated_at
    underscored: true   // usa snake_case
})

module.exports = Aluno
