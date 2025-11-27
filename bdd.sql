-- ===================================
-- TABELA DE USUÁRIOS (LOGIN)
-- ===================================
CREATE TABLE IF NOT EXISTS "Usuarios" (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- ===================================
-- TABELA DE TURMAS (COMPATÍVEL COM O MODEL)
-- ===================================
CREATE TABLE IF NOT EXISTS "Turmas" (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    turno VARCHAR(50),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- ===================================
-- TABELA DE ALUNOS (COMPATÍVEL COM O ASSOCIATE)
-- ===================================
CREATE TABLE IF NOT EXISTS "Alunos" (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150),
    turmaId INT,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_turma
        FOREIGN KEY (turmaId)
        REFERENCES "Turmas"(id)
        ON DELETE SET NULL
);
