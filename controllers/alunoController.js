// controller dos alunos
// esse é o mais completo pq tem chaveest da turma
// aluno pertence a uma turma


const Aluno = require('../models/aluno')
const Turma = require('../models/turma')

module.exports = {

    // listar alunos com join da turma
    list: async (req, res) => {
        const alunos = await Aluno.findAll({
            include: Turma
        })
        res.render('alunos/list', { alunos })
    },

    // form de criar aluno
    form: async (req, res) => {
        const turmas = await Turma.findAll()
        res.render('alunos/form', { aluno: null, turmas })
    },

    // criar aluno
    create: async (req, res) => {
        const { nome, email, turmaId } = req.body

        await Aluno.create({
            nome,
            email,
            turmaId
        })

        res.redirect('/alunos')
    },

    // form de editar aluno
    editView: async (req, res) => {
        const { id } = req.params

        const aluno = await Aluno.findByPk(id)
        const turmas = await Turma.findAll()

        res.render('alunos/form', { aluno, turmas })
    },

    // editar aluno
    update: async (req, res) => {
        const { id } = req.params
        const { nome, email, turmaId } = req.body

        await Aluno.update(
            { nome, email, turmaId },
            { where: { id } }
        )

        res.redirect('/alunos')
    },

    // deletar aluno
    delete: async (req, res) => {
        const { id } = req.params

        await Aluno.destroy({ where: { id } })

        res.redirect('/alunos')
    }
}
