import { testarConexao, pool } from './connection';
import { AutorService } from '../services/AutorService';
import { LivroService } from '../services/LivroService';
import { ClienteService } from '../services/ClienteService';

async function seed() {
  await testarConexao();

  const autorService = new AutorService();
  const livroService = new LivroService();
  const clienteService = new ClienteService();

  console.log('\n--- Cadastrando autores de teste ---');
  const autor1 = await autorService.cadastrar('Machado de Assis', 'Brasileiro');
  console.log(`Autor criado: id ${autor1.id} - ${autor1.nome}`);

  const autor2 = await autorService.cadastrar('J.K. Rowling', 'Britânica');
  console.log(`Autor criado: id ${autor2.id} - ${autor2.nome}`);

  console.log('\n--- Cadastrando livros de teste ---');
  const livro1 = await livroService.cadastrar('Dom Casmurro', autor1.id!, 5);
  console.log(`Livro criado: id ${livro1.id} - ${livro1.titulo}`);

  const livro2 = await livroService.cadastrar('Harry Potter e a Pedra Filosofal', autor2.id!, 3);
  console.log(`Livro criado: id ${livro2.id} - ${livro2.titulo}`);

  console.log('\n--- Cadastrando clientes de teste ---');
  const cliente1 = await clienteService.cadastrar('Ana Souza', 'ana.souza@teste.com', '48999990001');
  console.log(`Cliente criado: id ${cliente1.id} - ${cliente1.nome}`);

  const cliente2 = await clienteService.cadastrar('Bruno Lima', 'bruno.lima@teste.com', '48999990002');
  console.log(`Cliente criado: id ${cliente2.id} - ${cliente2.nome}`);

  console.log('\n--- Testando validações ---');
  try {
    await livroService.cadastrar('Livro Fantasma', 999, 1);
  } catch (error: any) {
    console.log(`✅ Validação (autor inexistente): ${error.message}`);
  }

  try {
    await clienteService.cadastrar('Ana Duplicada', 'ana.souza@teste.com', '48999990099');
  } catch (error: any) {
    console.log(`✅ Validação (e-mail duplicado): ${error.message}`);
  }

  try {
    await clienteService.cadastrar('Cliente Inválido', 'email-invalido', '48999990000');
  } catch (error: any) {
    console.log(`✅ Validação (e-mail inválido): ${error.message}`);
  }

  console.log('\n--- Listando tudo ---');
  console.log('Autores:', await autorService.listar());
  console.log('Livros:', await livroService.listar());
  console.log('Clientes:', await clienteService.listar());

  await pool.end();
  console.log('\n✅ Seed finalizado com sucesso!');
}

seed();