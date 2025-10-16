import { Turma, Aluno } from '../models/associations.js';

// READ: Listar todas as turmas e contar quantos alunos cada uma tem (JOIN)
export const listTurmas = async (req, res) => {
  try {
    const turmas = await Turma.findAll({
      include: {
        model: Aluno,
        attributes: [] // Não precisamos dos dados dos alunos, só da contagem
      },
      attributes: {
        // Usa a função COUNT do SQL para contar os alunos associados
        include: [[Sequelize.fn('COUNT', Sequelize.col('Alunos.id')), 'totalAlunos']]
      },
      group: ['Turma.id'], // Agrupa o resultado por turma para a contagem funcionar
      order: [['nome', 'ASC']]
    });
    res.render('turmas/list', { title: 'Turmas', turmas });
  } catch (error) {
    console.error("Erro ao listar turmas:", error);
    res.status(500).send(error.message);
  }
};

// EXIBIR FORMULÁRIO DE CRIAÇÃO
export const showCreateForm = (req, res) => {
  try {
    // CORREÇÃO APLICADA AQUI:
    // Enviamos um objeto 'turma' com campos vazios (um "molde")
    // em vez de 'null', para evitar o erro no EJS.
    res.render('turmas/form', {
      title: 'Nova Turma',
      turma: { id: null, nome: '' }, // <- ESTA É A MUDANÇA
      error: null
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// CREATE: Salva a nova turma no banco
export const createTurma = async (req, res) => {
  try {
    const { nome } = req.body;
    await Turma.create({ nome });
    res.redirect('/turmas');
  } catch (error) {
    // Tratamento de erro para nome de turma duplicado
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.render('turmas/form', {
        title: 'Nova Turma',
        turma: { nome }, // Devolve o nome que o usuário digitou
        error: 'Erro: Já existe uma turma com este nome.'
      });
    }
    res.status(500).send(error.message);
  }
};

// EXIBIR FORMULÁRIO DE EDIÇÃO
export const showEditForm = async (req, res) => {
  try {
    const turma = await Turma.findByPk(req.params.id);
    if (!turma) {
      return res.status(404).send('Turma não encontrada');
    }
    res.render('turmas/form', {
      title: 'Editar Turma',
      turma: turma,
      error: null
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// UPDATE: Atualiza uma turma no banco
export const updateTurma = async (req, res) => {
  try {
    const { nome } = req.body;
    await Turma.update({ nome }, { where: { id: req.params.id } });
    res.redirect('/turmas');
  } catch (error) {
     if (error.name === 'SequelizeUniqueConstraintError') {
      const turma = await Turma.findByPk(req.params.id);
      return res.render('turmas/form', {
        title: 'Editar Turma',
        turma: { ...turma.dataValues, nome },
        error: 'Erro: Já existe uma turma com este nome.'
      });
    }
    res.status(500).send(error.message);
  }
};

// DELETE: Deleta uma turma
export const deleteTurma = async (req, res) => {
  try {
    // Lógica de negócio: não permitir deletar turma com alunos.
    const totalAlunos = await Aluno.count({ where: { turmaId: req.params.id } });
    if (totalAlunos > 0) {
      // Idealmente, você enviaria essa mensagem de volta para a view com um 'flash message'
      return res.status(400).send('Não é possível excluir turmas que possuem alunos matriculados.');
    }
    await Turma.destroy({ where: { id: req.params.id } });
    res.redirect('/turmas');
  } catch (error) {
    res.status(500).send(error.message);
  }
};