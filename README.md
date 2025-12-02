  # 🧩 EscolaWEB — Sistema de Gestão de Alunos e Turmas

Bem-vindo ao **EscolaWEB**, um sistema completo de gestão acadêmica desenvolvido para controle de alunos, turmas e usuários.

Este projeto atende aos requisitos de **CRUD completo** com relacionamentos entre tabelas, autenticação de usuários e interface responsiva.

---

## 🚀 Sobre o projeto

O **EscolaWEB** é uma aplicação web desenvolvida com arquitetura **MVC (Model-View-Controller)**, integrando frontend e backend de forma estruturada.

**Objetivos principais:**
* Facilitar o cadastro, edição, consulta e exclusão de alunos e turmas.
* Implementar autenticação segura de usuários com sessões.
* Garantir integridade do banco de dados usando chaves estrangeiras.
* Oferecer uma interface clara, intuitiva e responsiva para diferentes dispositivos.

---

## 🛠️ Tecnologias Utilizadas

### 🔹 Frontend
* **EJS:** Renderização de páginas dinâmicas.
* **HTML5 / CSS3 / JavaScript:** Estrutura e interatividade.
* **Bootstrap 5:** Layout responsivo e moderno.
* **Partials EJS:** Reutilização de componentes (header, footer, navbar).

### 🔹 Backend
* **Node.js:** Execução do servidor.
* **Express.js:** Roteamento e APIs RESTful.
* **express-session:** Controle de sessões de usuário.
* **bcrypt:** Criptografia de senhas.
* **Sequelize:** ORM para PostgreSQL.
* **PostgreSQL:** Banco de dados relacional.
* **body-parser:** Processamento de dados de formulários.

---

## 💡 Funcionalidades Principais

### 1️⃣ Cadastro (CRUD — Create)
* Usuários (login e senha).
* Alunos.
* Turmas.

### 2️⃣ Edição (CRUD — Update)
* Alterar dados de alunos.
* Alterar turmas associadas a alunos (FK).
* Editar informações de usuários.

### 3️⃣ Consulta (CRUD — Read)
* Listar todos os alunos com a turma associada (JOIN).
* Exibir dados do usuário logado.
* Listar turmas com seus respectivos alunos (JOIN).

### 4️⃣ Exclusão (CRUD — Delete)
* Excluir aluno.
* Excluir turma (com verificação de FK).
* Excluir usuário.

### 5️⃣ Autenticação e Segurança
* Login e logout com **session-based authentication**.
* Senhas armazenadas criptografadas com **bcrypt**.
* Sessão expira automaticamente em 1 hora.

---

## 🖥️ Interface do Sistema

* Layout baseado em grid de 12 colunas, responsivo para **desktop, tablet e mobile**.
* Navegação organizada em abas e menus claros.
* Uso de cores e tipografia consistente para melhor legibilidade.
* Formulários de cadastro e edição fáceis de usar.
* Tabelas com listagem de alunos e turmas com informações completas.

---

## 🔒 Banco de Dados (PostgreSQL)

O sistema utiliza banco de dados relacional para garantir a consistência dos dados.

**Principais tabelas:**
1. **usuarios:** Cadastro e autenticação de usuários.
2. **turmas:** Informações das turmas (nome, turno).
3. **alunos:** Informações dos alunos e Chave Estrangeira (FK) para turmas.

**Relacionamentos:**
* Um aluno pertence a uma turma (`FK turma_id`).
* Uma turma pode ter vários alunos (`hasMany`).

---

## ⚙️ Integração Backend

* Backend estruturado em **MVC**: Models, Views e Controllers.
* Comunicação via **RESTful API**.
* Validação de dados e tratamento de erros no servidor.
* Sincronização do banco com **Sequelize**.
* Controle de relacionamentos e integridade referencial usando FK.

---

## 🧑‍💻 Equipe

| Membro | Responsabilidade |
| :--- | :--- |
| ### **Luiz Pereira** | *Desenvolvedor principal, backend e arquitetura do projeto* |
| ### **Miguel** | *EJS, criação das telas dinâmicas e views* |
| ### **Luís Gustavo** | *Backend em JS, rotas e lógica do servidor* |
| ### **Davi Lemes** | *Banco de dados com Sequelize, tabelas e relacionamentos* |







