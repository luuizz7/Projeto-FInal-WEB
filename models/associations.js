// relações entre as tabelas
// um aluno pertence a uma turma e uma turma tem vários alunos

const Turma = require('./turma')
const Aluno = require('./aluno')

// Uma Turma tem vários Alunos
Turma.hasMany(Aluno, { foreignKey: 'turma_id', onDelete: 'SET NULL' })

// Um Aluno pertence a uma Turma
Aluno.belongsTo(Turma, { foreignKey: 'turma_id' })

module.exports = { Turma, Aluno }
