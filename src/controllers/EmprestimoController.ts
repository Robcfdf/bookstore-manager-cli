import readlineSync from 'readline-sync';
import { EmprestimoService } from '../services/EmprestimoService';

export class EmprestimoController {
  private service = new EmprestimoService();

  async registrarEmprestimo(): Promise<void> {
    try {
      const livro_id = Number(readlineSync.question('ID do livro: '));
      const cliente_id = Number(readlineSync.question('ID do cliente: '));
      const emprestimo = await this.service.registrarEmprestimo(livro_id, cliente_id);
      console.log(`\n✅ Empréstimo registrado com sucesso! (id: ${emprestimo.id})\n`);
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}\n`);
    }
  }

  async registrarDevolucao(): Promise<void> {
    try {
      const id = Number(readlineSync.question('ID do empréstimo: '));
      await this.service.registrarDevolucao(id);
      console.log('\n✅ Devolução registrada com sucesso!\n');
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}\n`);
    }
  }

  async listar(): Promise<void> {
    try {
      const emprestimos = await this.service.listar();
      console.log('\n=== Empréstimos ===');
      emprestimos.forEach(e => console.log(
        `${e.id} - Livro: ${e.livro} | Cliente: ${e.cliente} | Emprestado em: ${e.data_emprestimo} | Devolvido: ${e.devolvido ? 'Sim' : 'Não'}`
      ));
      console.log('');
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}\n`);
    }
  }
}