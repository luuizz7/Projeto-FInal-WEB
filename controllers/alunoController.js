const Aluno = require('../models/aluno');
const Turma = require('../models/turma');
const Professor = require('../models/professor');

module.exports = {

    list: async (req, res) => {
        const alunos = await Aluno.findAll({
            include: [
                { model: Turma, as: "turma" },
                { model: Professor, as: "professores" }
            ]
        });

        res.render('alunos/list', { alunos });
    },

    form: async (req, res) => {
        const turmas = await Turma.findAll();
        const professores = await Professor.findAll();
        res.render('alunos/form', { aluno: null, turmas, professores });
    },

    create: async (req, res) => {
        const { nome, email, turmaId, professoresIds } = req.body;

        const aluno = await Aluno.create({ nome, email, turmaId });

        if (professoresIds) {
            await aluno.setProfessores(professoresIds);
        }

        res.redirect('/alunos');
    },

    editView: async (req, res) => {
        const aluno = await Aluno.findByPk(req.params.id, {
            include: { model: Professor, as: "professores" }
        });

        const turmas = await Turma.findAll();
        const professores = await Professor.findAll();

        res.render('alunos/form', { aluno, turmas, professores });
    },

    update: async (req, res) => {
        const { nome, email, turmaId, professoresIds } = req.body;

        const aluno = await Aluno.findByPk(req.params.id);

        await aluno.update({ nome, email, turmaId });

        await aluno.setProfessores(professoresIds || []);

        res.redirect('/alunos');
    },

    delete: async (req, res) => {
        await Aluno.destroy({ where: { id: req.params.id } });
        res.redirect('/alunos');
    },

    verProfessores: async (req, res) => {
        const aluno = await Aluno.findByPk(req.params.id, {
            include: { model: Professor, as: "professores" }
        });

        res.render('alunos/professores', { aluno });
    }
};
