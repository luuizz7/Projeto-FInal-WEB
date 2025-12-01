const Turma = require("./turma");
const Aluno = require("./aluno");
const Professor = require("./professor");
const AlunoProfessor = require("./alunoProfessor");


Turma.hasMany(Aluno, {
    foreignKey: "turmaId",
    as: "alunos"
});
Aluno.belongsTo(Turma, {
    foreignKey: "turmaId",
    as: "turma"
});

Aluno.belongsToMany(Professor, {
    through: AlunoProfessor,
    foreignKey: "alunoId",
    as: "professores"
});

Professor.belongsToMany(Aluno, {
    through: AlunoProfessor,
    foreignKey: "professorId",
    as: "alunos"
});

module.exports = { Turma, Aluno, Professor, AlunoProfessor };
