import readlineSync from 'readline-sync';
import { ClienteService } from '../services/ClienteService';

export class ClienteController {
  private service = new ClienteService();

  async cadastrar(): Promise<void> {
    try {
      const nome = readlineSync.question('Nome do cliente: ');
      const email = readlineSync.question('E-mail: ');
      const telefone = readlineSync.question('Telefone: ');
      const cliente = await this.service.cadastrar(nome, email, telefone);
      console.log(`\n Cliente cadastrado com sucesso! (id: ${cliente.id})\n`);
    } catch (error: any) {
      console.log(`\n Erro: ${error.message}\n`);
    }
  }

  async listar(): Promise<void> {
    try {
      const clientes = await this.service.listar();
      console.log('\n=== Clientes cadastrados ===');
      clientes.forEach(c => console.log(`${c.id} - ${c.nome} | ${c.email} | ${c.telefone ?? '-'}`));
      console.log('');
    } catch (error: any) {
      console.log(`\n Erro: ${error.message}\n`);
    }
  }

  async consultar(): Promise<void> {
    try {
      const id = Number(readlineSync.question('ID do cliente: '));
      const cliente = await this.service.buscarPorId(id);
      console.log(`\n${cliente.id} - ${cliente.nome} | ${cliente.email}\n`);
    } catch (error: any) {
      console.log(`\n Erro: ${error.message}\n`);
    }
  }

  async atualizar(): Promise<void> {
    try {
      const id = Number(readlineSync.question('ID do cliente a atualizar: '));
      const nome = readlineSync.question('Novo nome: ');
      const email = readlineSync.question('Novo e-mail: ');
      const telefone = readlineSync.question('Novo telefone: ');
      await this.service.atualizar(id, nome, email, telefone);
      console.log('\n Cliente atualizado com sucesso!\n');
    } catch (error: any) {
      console.log(`\n Erro: ${error.message}\n`);
    }
  }

  async remover(): Promise<void> {
    try {
      const id = Number(readlineSync.question('ID do cliente a remover: '));
      await this.service.remover(id);
      console.log('\n Cliente removido com sucesso!\n');
    } catch (error: any) {
      console.log(`\n Erro: ${error.message}\n`);
    }
  }
}