import { testarConexao, pool } from './connection';
import { AutorService } from '../services/AutorService';
import { LivroService } from '../services/LivroService';

async function seed() {
  await testarConexao();

  const autorService = new AutorService();
  const livroService = new LivroService();

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

  console.log('\n--- Testando validação (autor inexistente) ---');
  try {
    await livroService.cadastrar('Livro Fantasma', 999, 1);
  } catch (error: any) {
    console.log(`✅ Validação funcionou: ${error.message}`);
  }

  console.log('\n--- Listando tudo ---');
  const autores = await autorService.listar();
  console.log('Autores:', autores);

  const livros = await livroService.listar();
  console.log('Livros:', livros);

  await pool.end();
  console.log('\n✅ Seed finalizado com sucesso!');
}

seed();