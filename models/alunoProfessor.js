const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AlunoProfessor = sequelize.define('AlunoProfessor', {
    alunoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    professorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: true
});

module.exports = AlunoProfessor;
