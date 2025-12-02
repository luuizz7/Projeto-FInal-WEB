// configuracao das relacoes entre as tabelas usando sequelize
const Turma = require("./turma"); // modelo turma
const Aluno = require("./aluno"); // modelo aluno
const Professor = require("./professor"); // modelo professor
const AlunoProfessor = require("./alunoProfessor"); // tabela de ligacao

Turma.hasMany(Aluno, {
    foreignKey: "turmaId", // turma pode ter varios alunos
    as: "alunos"
});
Aluno.belongsTo(Turma, {
    foreignKey: "turmaId", // aluno pertence a uma turma
    as: "turma"
});

Aluno.belongsToMany(Professor, {
    through: AlunoProfessor,  // relacao n para n
    foreignKey: "alunoId",
    as: "professores"
});

Professor.belongsToMany(Aluno, {
    through: AlunoProfessor, // liga com alunos
    foreignKey: "professorId",
    as: "alunos"
});

module.exports = { Turma, Aluno, Professor, AlunoProfessor };
