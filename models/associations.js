const Turma = require('./turma')
const Aluno = require('./aluno')

Turma.hasMany(Aluno, {
    foreignKey: 'turma_id',  
    onDelete: 'SET NULL'
})

Aluno.belongsTo(Turma, {
    foreignKey: 'turma_id'
})

module.exports = { Turma, Aluno }
