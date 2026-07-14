import { testarConexao, pool } from './connection';
import { AutorService } from '../services/AutorService';
import { LivroService } from '../services/LivroService';
import { ClienteService } from '../services/ClienteService';
import { EmprestimoService } from '../services/EmprestimoService';
import { readFileSync } from 'fs';
import path from 'path';

async function seed() {
  await testarConexao();
  console.log('\n--- Limpando o banco de dados ---');
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schemaSql = readFileSync(schemaPath, 'utf-8');
  await pool.query(schemaSql);
  console.log('✅ Banco limpo e recriado com sucesso!');

  const autorService = new AutorService();
  const livroService = new LivroService();
  const clienteService = new ClienteService();
  const emprestimoService = new EmprestimoService();

  console.log('\n--- Cadastrando autores ---');
  const autor1 = await autorService.cadastrar('Machado de Assis', 'Brasileiro');
  const autor2 = await autorService.cadastrar('J.K. Rowling', 'Britânica');

  console.log('\n--- Cadastrando livros ---');
  const livro1 = await livroService.cadastrar('Dom Casmurro', autor1.id!, 2);
  const livro2 = await livroService.cadastrar('Harry Potter e a Pedra Filosofal', autor2.id!, 1);

  console.log('\n--- Cadastrando clientes ---');
  const cliente1 = await clienteService.cadastrar('Ana Souza', 'ana.souza@teste.com', '48999990001');
  const cliente2 = await clienteService.cadastrar('Bruno Lima', 'bruno.lima@teste.com', '48999990002');

  console.log('\n--- Registrando empréstimos ---');
  const emp1 = await emprestimoService.registrarEmprestimo(livro1.id!, cliente1.id!);
  console.log(`Empréstimo criado: id ${emp1.id} (livro ${livro1.titulo} -> cliente ${cliente1.nome})`);

  const emp2 = await emprestimoService.registrarEmprestimo(livro2.id!, cliente2.id!);
  console.log(`Empréstimo criado: id ${emp2.id} (livro ${livro2.titulo} -> cliente ${cliente2.nome})`);

  console.log('\n--- Testando validações de empréstimo ---');
  try {
    // livro2 só tinha 1 exemplar, já emprestado -> deve falhar
    await emprestimoService.registrarEmprestimo(livro2.id!, cliente1.id!);
  } catch (error: any) {
    console.log(`✅ Validação (sem disponibilidade): ${error.message}`);
  }

  try {
    await emprestimoService.registrarEmprestimo(999, cliente1.id!);
  } catch (error: any) {
    console.log(`✅ Validação (livro inexistente): ${error.message}`);
  }

  try {
    await emprestimoService.registrarEmprestimo(livro1.id!, 999);
  } catch (error: any) {
    console.log(`✅ Validação (cliente inexistente): ${error.message}`);
  }

  console.log('\n--- Registrando devolução ---');
  await emprestimoService.registrarDevolucao(emp2.id!);
  console.log(`Devolução registrada para o empréstimo id ${emp2.id}`);

  try {
    await emprestimoService.registrarDevolucao(emp2.id!);
  } catch (error: any) {
    console.log(`✅ Validação (devolução duplicada): ${error.message}`);
  }

  console.log('\n--- Listando empréstimos ---');
  console.log(await emprestimoService.listar());

  console.log('\n--- Conferindo disponibilidade atualizada dos livros ---');
  console.log(await livroService.listar());

  await pool.end();
  console.log('\n✅ Seed finalizado com sucesso!');
}

seed();