const { DataTypes } = require('sequelize'); // tipos do sequelize
const sequelize = require('../config/database'); // conexao

// modelo aluno
const Aluno = sequelize.define('Aluno', {
    id: {
        type: DataTypes.INTEGER, // chave primaria
        autoIncrement: true, 
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING, // campo obrigatorio
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
    },
    turmaId: {
        type: DataTypes.INTEGER, // liga com turma
        references: {
            model: 'Turma',
            key: 'id'
        }
    }
}, {
    freezeTableName: true, // nome fixo
    timestamps: true // datas auto
});

module.exports = Aluno; // exporta
