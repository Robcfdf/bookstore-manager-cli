import readlineSync from 'readline-sync';
import { EmprestimoController } from '../controllers/EmprestimoController';

export async function menuEmprestimos(): Promise<void> {
  const controller = new EmprestimoController();
  let voltar = false;

  while (!voltar) {
    console.log('\n=== Menu Empréstimos ===');
    console.log('1. Registrar empréstimo');
    console.log('2. Registrar devolução');
    console.log('3. Consultar empréstimos');
    console.log('0. Voltar ao menu principal');

    switch (readlineSync.question('Escolha uma opção: ')) {
      case '1': await controller.registrarEmprestimo(); break;
      case '2': await controller.registrarDevolucao(); break;
      case '3': await controller.listar(); break;
      case '0': voltar = true; break;
      default: console.log('\nOpção inválida.\n');
    }
  }
}