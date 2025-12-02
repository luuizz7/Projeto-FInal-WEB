const Turma = require('../models/turma'); // importa modelo turma
const Aluno = require('../models/aluno'); // importa modelo aluno

module.exports = {

    list: async (req, res) => {
        const turmas = await Turma.findAll({
            include: {
                model: Aluno,
                as: "alunos" // inclui alunos da turma
            }
        });

        res.render('turmas/list', { turmas }); // mostra lista de turmas
    },

    form: (req, res) => {
        res.render('turmas/form', { turma: null }); // form vazio
    },

    create: async (req, res) => {
        const { nome, turno } = req.body; // dados enviados

        await Turma.create({ nome, turno }); // cria turma

        res.redirect('/turmas'); // volta pra lista
    },

    editView: async (req, res) => {
        const { id } = req.params; // id da turma

        const turma = await Turma.findByPk(id); // busca turma

        res.render('turmas/form', { turma }); // mostra form preenchido
    },

    update: async (req, res) => {
        const { id } = req.params; // id da turma
        const { nome, turno } = req.body; // dados enviados

        await Turma.update(
            { nome, turno }, // novos valores
            { where: { id } } // onde atualizar
        );

        res.redirect('/turmas'); // volta pra lista
    },

    delete: async (req, res) => {
        const { id } = req.params; // id da turma

        try {
            await Turma.destroy({ where: { id } }); // tenta apagar
            res.redirect('/turmas'); // volta pra lista
        } catch (err) {
            res.send("Não é possível apagar a turma porque existem alunos vinculados."); // erro se tiver alunos
        }
    },

    listarAlunos: async (req, res) => {
        const { id } = req.params; // id da turma

        const turma = await Turma.findByPk(id, {
            include: {
                model: Aluno,
                as: "alunos" // busca alunos da turma
            }
        });

        res.render('turmas/alunos', { turma }); // mostra alunos da turma
    }
};
