const Professor = require('../models/professor');

module.exports = {

    list: async (req, res) => {
        const professores = await Professor.findAll();
        res.render('professores/list', { professores });
    },

    form: (req, res) => {
        res.render('professores/form', { professor: null });
    },

    create: async (req, res) => {
        const { nome, email } = req.body;

        await Professor.create({ nome, email });

        res.redirect('/professores');
    },

    editView: async (req, res) => {
        const professor = await Professor.findByPk(req.params.id);
        res.render('professores/form', { professor });
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { nome, email } = req.body;

        await Professor.update({ nome, email }, { where: { id } });

        res.redirect('/professores');
    },

    delete: async (req, res) => {
        await Professor.destroy({ where: { id: req.params.id } });
        res.redirect('/professores');
    }

};
