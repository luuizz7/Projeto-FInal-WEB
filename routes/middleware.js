//  middleware so deixa entrar na rota se o user tiver logado

function checarLogin(req, res, next) {
    if (req.session && req.session.usuarioId) {
        return next()
    } else {
        return res.redirect('/login')
    }
}

module.exports = { checarLogin }
