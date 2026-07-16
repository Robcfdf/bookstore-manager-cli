# 📚 BookStore Manager CLI

Aplicação de linha de comando (CLI) para gerenciamento completo de uma livraria,
desenvolvida em Node.js com TypeScript e persistência em PostgreSQL.

## 📖 Descrição do Projeto

O **BookStore Manager CLI** permite administrar autores, livros, clientes e
empréstimos de uma livraria por meio de menus interativos no terminal. O sistema
aplica regras de negócio, valida operações inválidas e disponibiliza relatórios
gerenciais construídos com consultas SQL relacionais.

## 🎯 Objetivo

Substituir o controle manual de uma livraria por uma solução informatizada,
aplicando conceitos de Programação Orientada a Objetos, programação assíncrona,
arquitetura em camadas, boas práticas de desenvolvimento (Clean Code) e modelagem
de banco de dados relacional.

## 🛠️ Tecnologias utilizadas

- Node.js
- TypeScript
- PostgreSQL
- pg (driver de conexão com o PostgreSQL)
- dotenv (variáveis de ambiente)
- readline-sync (entrada de dados via terminal)
- tsx (execução em desenvolvimento)

## ✅ Requisitos para execução

- Node.js 18 ou superior
- PostgreSQL instalado e em execução
- npm

## 🗄️ Configuração do banco de dados

1. Crie um banco de dados chamado `bookstore_manager`:
```sql
   CREATE DATABASE bookstore_manager;
```
2. Execute o script de criação das tabelas, localizado em
   `src/database/schema.sql`, no banco recém-criado (via pgAdmin, extensão
   PostgreSQL do VS Code, ou terminal `psql`).

## ⚙️ Instalação

```bash
git clone https://github.com/Robcfdf/bookstore-manager-cli.git
cd bookstore-manager-cli
npm install
```

Crie um arquivo `.env` na raiz do projeto (use `.env.example` como modelo):

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=bookstore_manager
```

## ▶️ Execução

**Ambiente de desenvolvimento** (recompila automaticamente):
```bash
npm run dev
```

**Build + execução (como em produção)**:
```bash
npm run build
npm start
```

**Popular o banco com dados de teste** (opcional, ferramenta de apoio ao
desenvolvimento):
```bash
npm run seed
```

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas, separando responsabilidades:

```
Usuário (CLI) → 
              Menu → 
                   Controller → 
                              Service → 
                                      Repository → 
                                                  PostgreSQL
```

| Camada | Responsabilidade |
|---|---|
| **Menus** | Organiza a navegação e exibe as opções no terminal |
| **Controllers** | Lê a entrada do usuário e repassa para os Services |
| **Services** | Aplica as regras de negócio da aplicação |
| **Repositories** | Executa os comandos SQL de acesso ao PostgreSQL |
| **Models** | Define as entidades do sistema (classes e interfaces tipadas) |
| **Database** | Centraliza a conexão com o banco e o script de criação das tabelas |
| **Utils** | Reúne validações e utilitários reutilizáveis entre módulos |

### Por que essa arquitetura

Optei por separar o projeto em camadas desde o primeiro commit porque, ao longo do curso,
 ficou claro que misturar tudo em um único arquivo funciona no começo,
  mas vira um problema conforme o sistema cresce. Cada vez que eu precisava adicionar um 
  novo módulo (Livros, depois Clientes, depois Empréstimos), eu já sabia exatamente onde 
  cada pedaço de código deveria morar — isso tornou o desenvolvimento mais previsível e
   me ajudou a não repetir lógica de validação ou de acesso ao banco entre os módulos.
    O ponto que mais me exigiu atenção foi o módulo de Empréstimos, porque
ali três entidades diferentes (Livro, Cliente e Empréstimo) precisam conversar entre si
 numa mesma operação, sem que nenhuma camada soubesse mais do que deveria sobre as outras.

## 📂 Estrutura de pastas

```
bookstore-manager-cli/
├── src/
│   ├── controllers/       # Interação com o terminal
│   ├── services/          # Regras de negócio
│   ├── repositories/      # Acesso ao banco de dados (SQL)
│   ├── models/             # Classes e interfaces das entidades
│   ├── database/           # Conexão e schema.sql
│   ├── utils/               # Validadores e AppError
│   ├── menus/               # Menus de navegação
│   └── main.ts              # Ponto de entrada da aplicação
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

### Sobre essa organização

Cada pasta dentro de `src/` representa uma responsabilidade única, e o nome já
entrega a função: quem abre `repositories/` sabe que vai encontrar SQL; quem abre
`services/` sabe que vai encontrar regras de negócio, sem nenhuma linha de SQL
misturada. Essa nomenclatura consistente foi uma escolha deliberada — pensando em
alguém (inclusive eu mesmo, no futuro) abrindo esse projeto pela primeira vez e
conseguindo se localizar sem precisar ler o código inteiro antes.

## ⚡ Funcionalidades implementadas

- **Autores**: cadastrar, listar, consultar, atualizar, remover
- **Livros**: cadastrar (vinculado a um autor), listar, consultar, atualizar, remover
- **Clientes**: cadastrar, listar, consultar, atualizar, remover
- **Empréstimos**: registrar empréstimo (com validação de disponibilidade),
  registrar devolução, consultar empréstimos
- **Relatórios**: livros disponíveis, livros emprestados, livros por autor,
  quantidade de empréstimos por livro, clientes com empréstimos ativos
- **Tratamento de erros**: validações de negócio com mensagens claras, sem
  interromper a execução da aplicação

## 💻 Exemplos de utilização

**Cadastro de autor**
```
Escolha uma opção: 1
1. Cadastrar autor
Escolha uma opção: 1
Nome do autor: Machado de Assis
Nacionalidade: Brasileiro

✅ Autor cadastrado com sucesso! (id: 1)
```

**Cadastro de livro vinculado a um autor**
```
Escolha uma opção: 2
1. Cadastrar livro
Título do livro: Dom Casmurro
ID do autor: 1
Quantidade de exemplares: 3

✅ Livro cadastrado com sucesso! (id: 1)
```

**Registro de empréstimo**
```
Escolha uma opção: 4
1. Registrar empréstimo
ID do livro: 1
ID do cliente: 1

✅ Empréstimo registrado com sucesso! (id: 1)
```

**Registro de devolução**
```
Escolha uma opção: 4
2. Registrar devolução
ID do empréstimo: 1

✅ Devolução registrada com sucesso!
```

**Relatório de livros disponíveis**
```
Escolha uma opção: 5
1. Livros disponíveis

=== Livros disponíveis ===
Dom Casmurro | Autor: Machado de Assis | Disponíveis: 3
```

**Exemplo de erro tratado (autor inexistente)**
```
Escolha uma opção: 2
1. Cadastrar livro
Título do livro: Livro Fantasma
ID do autor: 999
Quantidade de exemplares: 1

❌ Erro: Autor informado não existe. Cadastre o autor antes do livro.
```

**Exemplo de erro tratado (livro indisponível)**
```
Escolha uma opção: 4
1. Registrar empréstimo
ID do livro: 2
ID do cliente: 1

❌ Erro: Livro indisponível para empréstimo no momento.
```

## 🎬 Vídeo de apresentação

Vídeo demonstrando o funcionamento completo da aplicação, a arquitetura utilizada
e as principais decisões técnicas do projeto:

**[Link do vídeo será adicionado aqui após a gravação]**



## 👤 Integrante

- Robson Cássio Ferreira Duarte Filho ([@Robcfdf](https://github.com/Robcfdf))

## 📋 Kanban do projeto

[Acessar o quadro Kanban](https://github.com/users/Robcfdf/projects/7)

## 🔗 Repositório

[github.com/Robcfdf/bookstore-manager-cli](https://github.com/Robcfdf/bookstore-manager-cli)