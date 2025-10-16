import bcrypt from 'bcrypt';
import { Usuario } from '../models/associations.js';

export const showRegisterForm = (req, res) => {
  res.render('auth/register', { title: 'Registrar', error: null });
};

export const register = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const userExists = await Usuario.findOne({ where: { email } });
    if (userExists) {
      return res.render('auth/register', { title: 'Registrar', error: 'Email já cadastrado.' });
    }
    await Usuario.create({ nome, email, senha });
    res.redirect('/auth/login');
  } catch (error) {
    res.render('auth/register', { title: 'Registrar', error: 'Erro ao criar usuário.' });
  }
};

export const showLoginForm = (req, res) => {
  res.render('auth/login', { title: 'Login', error: null });
};

export const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.render('auth/login', { title: 'Login', error: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.render('auth/login', { title: 'Login', error: 'Senha incorreta.' });
    }

    // Salva na sessão
    req.session.userId = usuario.id;
    req.session.userName = usuario.nome;
    res.redirect('/alunos'); // Redireciona para uma página principal após login

  } catch (error) {
    res.render('auth/login', { title: 'Login', error: 'Ocorreu um erro durante o login.' });
  }
};

export const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/alunos'); // Ou outra página de erro
    }
    res.clearCookie('connect.sid'); // Limpa o cookie da sessão
    res.redirect('/auth/login');
  });
};
