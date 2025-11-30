const Turma = require("./turma");
const Aluno = require("./aluno");

Turma.hasMany(Aluno, {
    foreignKey: "turmaId",
    as: "alunos"
});

Aluno.belongsTo(Turma, {
    foreignKey: "turmaId",
    as: "turma"
});

module.exports = { Turma, Aluno };
