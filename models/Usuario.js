// model de usuario
// usuario tem nome, email e senha criptografada, usado pro login e cadastro

const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Usuario = sequelize.define('Usuario', {
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
        unique: true,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,       
    underscored: true      
})

module.exports = Usuario
