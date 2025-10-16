// A primeira linha DEVE ser esta para carregar as variáveis de ambiente
import 'dotenv/config'; 

import express from 'express';
import path from 'path';
import session from 'express-session';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override'; // Importante para os formulários de edição/deleção

// Importa a conexão com o banco de dados
import sequelize from './config/database.js';

// Importa os modelos para garantir que sejam registrados no Sequelize
import './models/associations.js';

// Importa as rotas
import alunosRoutes from './routes/alunos.js';
import turmasRoutes from './routes/turmas.js';
import authRoutes from './routes/auth.js';
import mainRoutes from './routes/main.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração para usar __dirname com ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar o EJS como view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bi', express.static(path.join(__dirname, 'node_modules/bootstrap-icons/font')));
app.use(methodOverride('_method')); // Permite que formulários HTML usem métodos PUT e DELETE

// Configuração da sessão
app.use(session({
  // MUDANÇA AQUI: Usa a chave secreta do arquivo .env
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Para desenvolvimento. Em produção, use true com HTTPS
}));

// Middleware para passar dados da sessão para todas as views
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Rotas da aplicação
app.use('/', mainRoutes);
app.use('/auth', authRoutes);
app.use('/alunos', alunosRoutes);
app.use('/turmas', turmasRoutes);

// Sincronizar com o banco de dados e iniciar o servidor
sequelize.sync({
    // force: true // Cuidado: isso apaga e recria as tabelas a cada reinicialização
}).then(() => {
  console.log('Banco de dados sincronizado.');
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao sincronizar com o banco de dados:', err);
});