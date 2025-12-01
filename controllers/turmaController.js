const Turma = require('../models/turma');
const Aluno = require('../models/aluno');

module.exports = {

    list: async (req, res) => {
        const turmas = await Turma.findAll({
            include: {
                model: Aluno,
                as: "alunos"
            }
        });

        res.render('turmas/list', { turmas });
    },

    form: (req, res) => {
        res.render('turmas/form', { turma: null });
    },

    create: async (req, res) => {
        const { nome, turno } = req.body;

        await Turma.create({ nome, turno });

        res.redirect('/turmas');
    },

    editView: async (req, res) => {
        const { id } = req.params;

        const turma = await Turma.findByPk(id);

        res.render('turmas/form', { turma });
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { nome, turno } = req.body;

        await Turma.update(
            { nome, turno },
            { where: { id } }
        );

        res.redirect('/turmas');
    },

    delete: async (req, res) => {
        const { id } = req.params;

        try {
            await Turma.destroy({ where: { id } });
            res.redirect('/turmas');
        } catch (err) {
            res.send("Não é possível apagar a turma porque existem alunos vinculados.");
        }
    },

    listarAlunos: async (req, res) => {
        const { id } = req.params;

        const turma = await Turma.findByPk(id, {
            include: {
                model: Aluno,
                as: "alunos"
            }
        });

        res.render('turmas/alunos', { turma });
    }
};
