const Professor = require('../models/professor'); // importa modelo professor

module.exports = {

    list: async (req, res) => {
        const professores = await Professor.findAll(); // busca todos professores
        res.render('professores/list', { professores }); // mostra lista
    },

    form: (req, res) => {
        res.render('professores/form', { professor: null }); // form vazio
    },

    create: async (req, res) => {
        const { nome, email } = req.body; // dados enviados

        await Professor.create({ nome, email }); // cria professor

        res.redirect('/professores'); // volta pra lista
    },

    editView: async (req, res) => {
        const professor = await Professor.findByPk(req.params.id); // busca professor
        res.render('professores/form', { professor }); // form preenchido
    },

    update: async (req, res) => {
        const { id } = req.params; // id do professor
        const { nome, email } = req.body; // dados enviados

        await Professor.update({ nome, email }, { where: { id } }); // atualiza professor

        res.redirect('/professores'); // volta pra lista
    },

    delete: async (req, res) => {
        await Professor.destroy({ where: { id: req.params.id } }); // remove professor
        res.redirect('/professores'); // redireciona
    }

};
