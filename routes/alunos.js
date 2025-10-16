const express = require('express');
const router = express.Router();
const alunos = require('../models/aluno');
const turmas = require('../models/turma');
let ultimoAlunoId = alunos.length > 0 ? Math.max(...alunos.map(a => a.id)) : 0;

router.get('/', (req, res) => res.json(alunos));

router.get('/nome/:nome', (req, res) => {
    const nomeBusca = req.params.nome.toLowerCase();
    const encontrados = alunos.filter(a => a.nome.toLowerCase().includes(nomeBusca));
    res.json(encontrados);
});

router.get('/turma/:turmaId', (req, res) => {
    const turmaId = Number(req.params.turmaId);
    const encontrados = alunos.filter(a => a.turmaId === turmaId);
    res.json(encontrados);
});

router.get('/turma/:turmaId/nome/:nome', (req, res) => {
    const turmaId = Number(req.params.turmaId);
    const nomeBusca = req.params.nome.toLowerCase();
    const encontrados = alunos.filter(a => a.turmaId === turmaId && a.nome.toLowerCase().includes(nomeBusca));
    res.json(encontrados);
});

router.post('/', (req, res) => {
    const { nome, turmaId } = req.body;
    if (!nome || !turmaId) return res.status(400).json({ erro: 'Nome e turmaId obrigatórios' });
    const turmaExiste = turmas.find(t => t.id === turmaId);
    if (!turmaExiste) return res.status(400).json({ erro: 'Turma não encontrada' })
    ultimoAlunoId++; // garante incremento único
    const novoAluno = { id: ultimoAlunoId, nome, turmaId };
    alunos.push(novoAluno);
    res.status(201).json(novoAluno);
});


router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { nome, turmaId } = req.body;

    const aluno = alunos.find(a => a.id === id);
    if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });

    if (nome) aluno.nome = nome;

    if (turmaId) {
        const turmaExiste = turmas.find(t => t.id === turmaId);
        if (!turmaExiste) return res.status(400).json({ erro: 'Turma não encontrada' });
        aluno.turmaId = turmaId; // altera turma do aluno
    }

    res.json(aluno);
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = alunos.findIndex(a => a.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Aluno não encontrado' });
    alunos.splice(index, 1);
    res.status(204).end();
});

module.exports = router;
