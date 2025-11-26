// ontroller das turmas
// se tiver aluno, ele nao deixa apagar (bdd bloqueia)

const Turma = require('../models/turma')
const Aluno = require('../models/aluno')

module.exports = {

    // listar turmas
    list: async (req, res) => {
        const turmas = await Turma.findAll()
        res.render('turmas/list', { turmas })
    },

    // mostrar form de criar turma
    form: (req, res) => {
        res.render('turmas/form', { turma: null })
    },

    // criar turma
    create: async (req, res) => {
        const { nome } = req.body
        await Turma.create({ nome })
        res.redirect('/turmas')
    },

    // mostrar form de editar turma
    editView: async (req, res) => {
        const { id } = req.params
        const turma = await Turma.findByPk(id)
        res.render('turmas/form', { turma })
    },

    // atualizar turma
    update: async (req, res) => {
        const { id } = req.params
        const { nome } = req.body

        await Turma.update({ nome }, { where: { id } })

        res.redirect('/turmas')
    },

    // deletar turma
    delete: async (req, res) => {
        const { id } = req.params

        try {
            await Turma.destroy({ where: { id } })
            res.redirect('/turmas')
        } catch (err) {
            console.log('erro ao deletar turma', err)
            res.send('nao pode apagar turma pq tem aluno nela')
        }
    }
}
