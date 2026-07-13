import readlineSync from 'readline-sync';
import { LivroService } from '../services/LivroService';

export class LivroController {
  private service = new LivroService();

  async cadastrar(): Promise<void> {
    try {
      const titulo = readlineSync.question('Título do livro: ');
      const autor_id = Number(readlineSync.question('ID do autor: '));
      const quantidade = Number(readlineSync.question('Quantidade de exemplares: '));
      const livro = await this.service.cadastrar(titulo, autor_id, quantidade);
      console.log(`\n Livro cadastrado com sucesso! (id: ${livro.id})\n`);
    } catch (error: any) {
      console.log(`\n Erro: ${error.message}\n`);
    }
  }

  async listar(): Promise<void> {
    try {
      const livros = await this.service.listar();
      console.log('\n=== Livros cadastrados ===');
      livros.forEach(l => console.log(`${l.id} - ${l.titulo} | Autor: ${l.autor_nome} | Disponíveis: ${l.quantidade_disponivel}/${l.quantidade_total}`));
      console.log('');
    } catch (error: any) {
      console.log(`\n Erro: ${error.message}\n`);
    }
  }

  async consultar(): Promise<void> {
    try {
      const id = Number(readlineSync.question('ID do livro: '));
      const livro = await this.service.buscarPorId(id);
      console.log(`\n${livro.id} - ${livro.titulo} | Disponíveis: ${livro.quantidade_disponivel}/${livro.quantidade_total}\n`);
    } catch (error: any) {
      console.log(`\n Erro: ${error.message}\n`);
    }
  }

  async atualizar(): Promise<void> {
    try {
      const id = Number(readlineSync.question('ID do livro a atualizar: '));
      const titulo = readlineSync.question('Novo título: ');
      const autor_id = Number(readlineSync.question('Novo ID do autor: '));
      const quantidade = Number(readlineSync.question('Nova quantidade total: '));
      await this.service.atualizar(id, titulo, autor_id, quantidade);
      console.log('\n Livro atualizado com sucesso!\n');
    } catch (error: any) {
      console.log(`\n Erro: ${error.message}\n`);
    }
  }

  async remover(): Promise<void> {
    try {
      const id = Number(readlineSync.question('ID do livro a remover: '));
      await this.service.remover(id);
      console.log('\n Livro removido com sucesso!\n');
    } catch (error: any) {
      console.log(`\n Erro: ${error.message}\n`);
    }
  }
}