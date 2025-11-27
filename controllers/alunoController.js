const Aluno = require('../models/aluno');
const Turma = require('../models/turma');

module.exports = {

    // Listar alunos com a turma (JOIN)
    list: async (req, res) => {
        const alunos = await Aluno.findAll({
            include: {
                model: Turma,
                as: "turma"
            }
        });

        res.render('alunos/list', { alunos });
    },

    // Formulário de criação
    form: async (req, res) => {
        const turmas = await Turma.findAll();
        res.render('alunos/form', { aluno: null, turmas });
    },

    // Criar aluno
    create: async (req, res) => {
        const { nome, email, turmaId } = req.body;

        await Aluno.create({
            nome,
            email,
            turmaId
        });

        res.redirect('/alunos');
    },

    // Formulário de edição
    editView: async (req, res) => {
        const { id } = req.params;

        const aluno = await Aluno.findByPk(id);
        const turmas = await Turma.findAll();

        res.render('alunos/form', { aluno, turmas });
    },

    // Atualizar aluno
    update: async (req, res) => {
        const { id } = req.params;
        const { nome, email, turmaId } = req.body;

        await Aluno.update(
            { nome, email, turmaId },
            { where: { id } }
        );

        res.redirect('/alunos');
    },

    // Deletar aluno
    delete: async (req, res) => {
        const { id } = req.params;

        await Aluno.destroy({ where: { id } });

        res.redirect('/alunos');
    }
};
