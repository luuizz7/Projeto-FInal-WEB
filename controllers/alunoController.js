const Aluno = require('../models/aluno'); // importa modelo aluno
const Turma = require('../models/turma'); // importa modelo turma
const Professor = require('../models/professor'); // importa modelo professor

module.exports = {

    list: async (req, res) => {
        const alunos = await Aluno.findAll({
            include: [
                { model: Turma, as: "turma" }, // inclui turma do aluno
                { model: Professor, as: "professores" } // inclui professores do aluno
            ]
        });

        res.render('alunos/list', { alunos }); // renderiza pagina com alunos
    },

    form: async (req, res) => {
        const turmas = await Turma.findAll(); // busca turmas
        const professores = await Professor.findAll(); // busca professores
        res.render('alunos/form', { aluno: null, turmas, professores }); // mostra formulario vazio
    },

    create: async (req, res) => {
        const { nome, email, turmaId, professoresIds } = req.body; // pega dados enviados

        const aluno = await Aluno.create({ nome, email, turmaId }); // cria aluno

        if (professoresIds) {
            await aluno.setProfessores(professoresIds); // vincula professores
        }

        res.redirect('/alunos'); // redireciona pra lista
    },

    editView: async (req, res) => {
        const aluno = await Aluno.findByPk(req.params.id, {
            include: { model: Professor, as: "professores" } // busca professores do aluno
        });

        const turmas = await Turma.findAll(); // busca turmas
        const professores = await Professor.findAll(); // busca professores

        res.render('alunos/form', { aluno, turmas, professores }); // mostra formulario preenchido
    },

    update: async (req, res) => {
        const { nome, email, turmaId, professoresIds } = req.body; // dados enviados

        const aluno = await Aluno.findByPk(req.params.id); // busca aluno

        await aluno.update({ nome, email, turmaId }); // atualiza aluno

        await aluno.setProfessores(professoresIds || []); // atualiza professores

        res.redirect('/alunos'); // volta pra lista
    },

    delete: async (req, res) => {
        await Aluno.destroy({ where: { id: req.params.id } }); // remove aluno
        res.redirect('/alunos'); // redireciona
    },

    verProfessores: async (req, res) => {
        const aluno = await Aluno.findByPk(req.params.id, {
            include: { model: Professor, as: "professores" } // pega professores
        });

        res.render('alunos/professores', { aluno }); // mostra professores do aluno
    }
};
