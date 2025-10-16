export const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next(); // Usuário está logado, continue
  }
  res.redirect('/auth/login'); // Não está logado, redirecione para o login
};
