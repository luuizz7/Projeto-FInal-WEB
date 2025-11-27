// carregando libs que o projeto precisa
const express = require("express")
const session = require("express-session")
const path = require("path")
const bodyparser = require("body-parser")
const sequelize = require("./config/database")

const app = express()

// carrega models e associações
require("./models/turma")
require("./models/aluno")
require("./models/associations")

// config de sessao pra login
app.use(
    session({
        secret: "segredo muito brabo aqui",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60
        }
    })
)

// pegar dados do form
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// arquivos estaticos
app.use(express.static(path.join(__dirname, "public")))

// config do ejs
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// middleware global pra enviar a variavel 'usuario' pra todas as views
app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario || null
    next()
})

// importando rotas
const authRoutes = require("./routes/auth")
const mainRoutes = require("./routes/main")
const alunoRoutes = require("./routes/alunos")
const turmaRoutes = require("./routes/turmas")

// usando rotas
app.use("/auth", authRoutes)
app.use("/", mainRoutes)
app.use("/alunos", alunoRoutes)
app.use("/turmas", turmaRoutes)

// sincronizando banco
sequelize
    .sync()
    .then(() => console.log("Banco sincronizado"))
    .catch(err => console.log("Erro no banco", err))

// iniciando servidor
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
