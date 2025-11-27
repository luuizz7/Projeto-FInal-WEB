// models/Aluno.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
        allowNull: true
    },
    turmaId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Turmas',
            key: 'id'
        },
        onDelete: 'SET NULL'
    }
}, {
    freezeTableName: true,
    timestamps: true
});

module.exports = Aluno;
