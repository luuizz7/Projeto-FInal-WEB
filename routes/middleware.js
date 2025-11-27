// middleware só deixa entrar na rota se o user tiver logado

function checarLogin(req, res, next) {
    if (req.session && req.session.usuario) {
        return next();
    } else {
        return res.redirect('/auth/login');
    }
}

module.exports = { checarLogin };
