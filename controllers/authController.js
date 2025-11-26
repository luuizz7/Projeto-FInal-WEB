// controllers/authController.js

const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')

module.exports = {

    // mostrar tela de login
    loginView: (req, res) => {
        res.render('auth/login', { erro: null })
    },

    // mostrar tela de registro
    registerView: (req, res) => {
        res.render('auth/register', { erro: null })
    },

    // registrar usuario novo
    register: async (req, res) => {
        try {
            const { nome, email, senha } = req.body

            if (!nome || !email || !senha) {
                return res.render('auth/register', { erro: 'Preencha todos os campos' })
            }

            // checando se o email já existe
            const existente = await Usuario.findOne({ where: { email } })
            if (existente) {
                return res.render('auth/register', { erro: 'Email já cadastrado' })
            }

            const senhaCripto = await bcrypt.hash(senha, 10)

            await Usuario.create({ nome, email, senha: senhaCripto })

            // redireciona pro login
            res.redirect('/auth/login')
        } catch (err) {
            console.log('Erro ao registrar usuário:', err)
            res.render('auth/register', { erro: 'Erro ao registrar usuário' })
        }
    },

    // fazer login
    login: async (req, res) => {
        try {
            const { email, senha } = req.body

            if (!email || !senha) {
                return res.render('auth/login', { erro: 'Preencha todos os campos' })
            }

            const usuario = await Usuario.findOne({ where: { email } })

            if (!usuario) {
                return res.render('auth/login', { erro: 'Usuário não encontrado' })
            }

            const senhaValida = await bcrypt.compare(senha, usuario.senha)
            if (!senhaValida) {
                return res.render('auth/login', { erro: 'Senha incorreta' })
            }

            // salvando usuário na sessão
            req.session.usuario = {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }

            // redireciona pra página inicial
            res.redirect('/')
        } catch (err) {
            console.log('Erro no login:', err)
            res.render('auth/login', { erro: 'Erro ao fazer login' })
        }
    },

    // logout
    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/auth/login')
    }
}
