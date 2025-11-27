const Turma = require("./turma");
const Aluno = require("./aluno");

// turma pode ter varios alunos
Turma.hasMany(Aluno, {
    foreignKey: "turmaId",
    as: "alunos"
});

// aluno pertence a 1 turma
Aluno.belongsTo(Turma, {
    foreignKey: "turmaId",
    as: "turma"
});

module.exports = { Turma, Aluno };
