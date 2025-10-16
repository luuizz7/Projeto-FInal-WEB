import { Turma, Aluno } from '../models/associations.js';
import { Sequelize } from 'sequelize';

// READ: Listar todas as turmas com a contagem de alunos (JOIN)
export const listTurmas = async (req, res) => {
  try {
    const turmas = await Turma.findAll({
      attributes: [
        'id',
        'nome',
        // Conta quantos alunos estão associados a cada turma
        [Sequelize.fn('COUNT', Sequelize.col('Alunos.id')), 'totalAlunos']
      ],
      include: [{
        model: Aluno,
        attributes: [] // Não traz dados dos alunos, apenas usa para a contagem
      }],
      group: ['Turma.id'],
      order: [['nome', 'ASC']]
    });
    res.render('turmas/list', { title: 'Turmas', turmas });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Mostra o formulário para criar uma nova turma
export const showCreateForm = (req, res) => {
  res.render('turmas/form', { title: 'Nova Turma', turma: null });
};

// CREATE: Cria uma nova turma
export const createTurma = async (req, res) => {
    try {
        await Turma.create(req.body);
        res.redirect('/turmas');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Mostra o formulário para editar uma turma
export const showEditForm = async (req, res) => {
    try {
        const turma = await Turma.findByPk(req.params.id);
        if (!turma) {
            return res.status(404).send('Turma não encontrada');
        }
        res.render('turmas/form', { title: 'Editar Turma', turma });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// UPDATE: Atualiza o nome da turma
export const updateTurma = async (req, res) => {
    try {
        await Turma.update(req.body, { where: { id: req.params.id } });
        res.redirect('/turmas');
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// DELETE: Deleta uma turma (afetando FK)
export const deleteTurma = async (req, res) => {
  try {
    // A lógica onDelete: 'SET NULL' no modelo Aluno cuidará dos alunos associados
    await Turma.destroy({ where: { id: req.params.id } });
    res.redirect('/turmas');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
