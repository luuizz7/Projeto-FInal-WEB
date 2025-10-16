import { Aluno, Turma } from '../models/associations.js';

// READ: Listar todos os alunos com o nome da turma (JOIN)
export const listAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.findAll({
      include: {
        model: Turma,
        attributes: ['nome'] // Pega apenas o nome da turma
      },
      order: [['nome', 'ASC']]
    });
    res.render('alunos/list', { title: 'Alunos', alunos });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Mostra o formulário para criar um novo aluno
export const showCreateForm = async (req, res) => {
    try {
        const turmas = await Turma.findAll({ order: [['nome', 'ASC']] });
        res.render('alunos/form', { title: 'Novo Aluno', aluno: null, turmas });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// CREATE: Cria um novo aluno no banco
export const createAluno = async (req, res) => {
  try {
    const { nome, matricula, turmaId } = req.body;
    await Aluno.create({ nome, matricula, turmaId });
    res.redirect('/alunos');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Mostra o formulário para editar um aluno
export const showEditForm = async (req, res) => {
    try {
        const aluno = await Aluno.findByPk(req.params.id);
        const turmas = await Turma.findAll({ order: [['nome', 'ASC']] });
        if (!aluno) {
            return res.status(404).send('Aluno não encontrado');
        }
        res.render('alunos/form', { title: 'Editar Aluno', aluno, turmas });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// UPDATE: Atualiza os dados de um aluno (envolvendo FK)
export const updateAluno = async (req, res) => {
    try {
        const { nome, matricula, turmaId } = req.body;
        await Aluno.update(
            { nome, matricula, turmaId },
            { where: { id: req.params.id } }
        );
        res.redirect('/alunos');
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// DELETE: Deleta um aluno
export const deleteAluno = async (req, res) => {
  try {
    await Aluno.destroy({ where: { id: req.params.id } });
    res.redirect('/alunos');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
