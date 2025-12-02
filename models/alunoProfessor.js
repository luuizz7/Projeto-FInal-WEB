const { DataTypes } = require('sequelize'); // tipos
const sequelize = require('../config/database'); // conexao

// tabela de ligacao aluno professor
const AlunoProfessor = sequelize.define('AlunoProfessor', {
    alunoId: {
        type: DataTypes.INTEGER, // id aluno
        allowNull: false
    },
    professorId: {
        type: DataTypes.INTEGER, // id professor
        allowNull: false
    }
}, {
    freezeTableName: true, // nome fixo
    timestamps: true // datas auto
});

module.exports = AlunoProfessor; // exporta
