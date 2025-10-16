const express = require('express');
const router = express.Router();
const turmas = require('../models/turma');
const alunos = require('../models/aluno');
let ultimaTurmaId = turmas.length > 0 ? Math.max(...turmas.map(t => t.id)) : 0;

router.get('/', (req, res) => {
    res.json(turmas);
});

router.get('/com-alunos', (req, res) => {
    const resultado = turmas.map(t => {
        const alunosDaTurma = alunos.filter(a => a.turmaId === t.id);
        return { ...t, alunos: alunosDaTurma };
    });
    res.json(resultado);
});

router.post('/', (req, res) => {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ erro: 'Nome obrigatório' });
    ultimaTurmaId++;
    const novaTurma = { id: ultimaTurmaId, nome };
    turmas.push(novaTurma);
    res.status(201).json(novaTurma);
});


router.post('/', (req, res) => {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ erro: 'Nome obrigatório' });
    const novoId = turmas.length > 0 ? Math.max(...turmas.map(t => t.id)) + 1 : 1;
    const novaTurma = { id: novoId, nome };
    turmas.push(novaTurma);
    res.status(201).json(novaTurma); // idem, retornar turma criada
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = turmas.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Turma não encontrada' });

    // apagar alunos dessa turma
    for (let i = alunos.length - 1; i >= 0; i--) {
        if (alunos[i].turmaId === id) {
            alunos.splice(i, 1);
        }
    }

    turmas.splice(index, 1);
    res.status(204).end();
});

module.exports = router;
