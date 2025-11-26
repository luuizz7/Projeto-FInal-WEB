-- ============================
-- TABELA DE USUÁRIOS (LOGIN)
-- ============================
CREATE TABLE IF NOT EXISTS "Usuarios" (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- ============================
-- TABELA DE TURMAS
-- ============================
CREATE TABLE IF NOT EXISTS "Turmas" (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    turno VARCHAR(50),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- ============================
-- TABELA DE ALUNOS
-- ============================
CREATE TABLE IF NOT EXISTS "Alunos" (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150),
    turmaId INT REFERENCES "Turmas"(id) ON DELETE RESTRICT,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);
