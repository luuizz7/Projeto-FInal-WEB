import Aluno from './aluno.js';
import Turma from './turma.js';
import Usuario from './usuario.js';

// Relacionamento: Uma Turma pode ter vários Alunos.
Turma.hasMany(Aluno, {
  foreignKey: 'turmaId',
  onDelete: 'SET NULL', 
  onUpdate: 'CASCADE'
});

// Relacionamento: Um Aluno pertence a uma Turma.
Aluno.belongsTo(Turma, {
  foreignKey: 'turmaId'
});

// Exporta todos os modelos para serem usados em outros lugares
export { Aluno, Turma, Usuario };

