-- ============================================================
-- BookStore Manager CLI - Script de criação do banco de dados
-- Banco: PostgreSQL
-- ============================================================

DROP TABLE IF EXISTS emprestimos CASCADE;
DROP TABLE IF EXISTS livros CASCADE;
DROP TABLE IF EXISTS clientes CASCADE;
DROP TABLE IF EXISTS autores CASCADE;

-- ------------------------------------------------------------
-- Tabela: autores
-- ------------------------------------------------------------
CREATE TABLE autores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    nacionalidade VARCHAR(100) NOT NULL
);

-- ------------------------------------------------------------
-- Tabela: livros
-- Relacionamento: cada livro pertence obrigatoriamente a um autor
-- ------------------------------------------------------------
CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    ano_publicacao INTEGER NOT NULL,
    quantidade_total INTEGER NOT NULL CHECK (quantidade_total >= 0),
    quantidade_disponivel INTEGER NOT NULL CHECK (quantidade_disponivel >= 0),
    autor_id INTEGER NOT NULL,
    CONSTRAINT fk_livro_autor
        FOREIGN KEY (autor_id)
        REFERENCES autores (id)
        ON DELETE RESTRICT
);

-- ------------------------------------------------------------
-- Tabela: clientes
-- ------------------------------------------------------------
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL
);

-- ------------------------------------------------------------
-- Tabela: emprestimos
-- Relacionamento: cada empréstimo referencia um livro e um cliente
-- ------------------------------------------------------------
CREATE TABLE emprestimos (
    id SERIAL PRIMARY KEY,
    livro_id INTEGER NOT NULL,
    cliente_id INTEGER NOT NULL,
    data_emprestimo TIMESTAMP NOT NULL DEFAULT NOW(),
    data_devolucao TIMESTAMP,
    devolvido BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_emprestimo_livro
        FOREIGN KEY (livro_id)
        REFERENCES livros (id)
        ON DELETE RESTRICT,
    CONSTRAINT fk_emprestimo_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES clientes (id)
        ON DELETE RESTRICT
);

-- ------------------------------------------------------------
-- Índices auxiliares para consultas relacionais mais eficientes
-- ------------------------------------------------------------
CREATE INDEX idx_livros_autor_id ON livros (autor_id);
CREATE INDEX idx_emprestimos_livro_id ON emprestimos (livro_id);
CREATE INDEX idx_emprestimos_cliente_id ON emprestimos (cliente_id);
