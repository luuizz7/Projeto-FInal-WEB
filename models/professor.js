// modelo professor com campos basicos usados no cadastro
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Professor = sequelize.define('Professor', {
    id: {
        type: DataTypes.INTEGER, // chave primaria
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING, // nome obrigatorio
        allowNull: false
    },
    email: {
        type: DataTypes.STRING // email opcional
    }
}, {
    freezeTableName: true, // nome fixo da tabela
    timestamps: true // cria datas automaticas
});

module.exports = Professor;
