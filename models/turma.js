const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
        allowNull: true,
        validate: {
            isIn: [['Matutino', 'Vespertino', 'Noturno']]
        }
    }
}, {
    freezeTableName: true,
    timestamps: true
});

module.exports = Turma;
