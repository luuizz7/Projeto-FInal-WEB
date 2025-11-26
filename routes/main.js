// rota da página inicial
// só abre se o usuário estiver logado

const express = require('express')
const router = express.Router()
const { checarLogin } = require('./middleware')

router.get('/', checarLogin, (req, res) => {
    // passa o usuario da sessão para o header
    res.render('index', { usuario: req.session.usuario || null })
})

module.exports = router
