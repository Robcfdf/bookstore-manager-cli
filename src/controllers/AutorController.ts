import readlineSync from 'readline-sync';
import { AutorService } from '../services/AutorService';

export class AutorController {
  private service = new AutorService();

  async cadastrar(): Promise<void> {
    try {
      const nome = readlineSync.question('Nome do autor: ');
      const nacionalidade = readlineSync.question('Nacionalidade: ');
      const autor = await this.service.cadastrar(nome, nacionalidade);
      console.log(`\n Autor cadastrado com sucesso! (id: ${autor.id})\n`);
    } catch (error: any) {
      console.log(`\n Erro: ${error.message}\n`);
    }
  }

  async listar(): Promise<void> {
    try {
      const autores = await this.service.listar();
      console.log('\n=== Autores cadastrados ===');
      autores.forEach(a => console.log(`${a.id} - ${a.nome} (${a.nacionalidade})`));
      console.log('');
    } catch (error: any) {
      console.log(`\n Erro: ${error.message}\n`);
    }
  }

  async consultar(): Promise<void> {
    try {
      const id = Number(readlineSync.question('ID do autor: '));
      const autor = await this.service.buscarPorId(id);
      console.log(`\n${autor.id} - ${autor.nome} (${autor.nacionalidade})\n`);
    } catch (error: any) {
      console.log(`\n Erro: ${error.message}\n`);
    }
  }

  async atualizar(): Promise<void> {
    try {
      const id = Number(readlineSync.question('ID do autor a atualizar: '));
      const nome = readlineSync.question('Novo nome: ');
      const nacionalidade = readlineSync.question('Nova nacionalidade: ');
      await this.service.atualizar(id, nome, nacionalidade);
      console.log('\n Autor atualizado com sucesso!\n');
    } catch (error: any) {
      console.log(`\n Erro: ${error.message}\n`);
    }
  }

  async remover(): Promise<void> {
    try {
      const id = Number(readlineSync.question('ID do autor a remover: '));
      await this.service.remover(id);
      console.log('\n Autor removido com sucesso!\n');
    } catch (error: any) {
      console.log(`\n Erro: ${error.message}\n`);
    }
  }
}