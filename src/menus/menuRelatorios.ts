import readlineSync from 'readline-sync';
import { RelatorioController } from '../controllers/RelatorioController';

export async function menuRelatorios(): Promise<void> {
  const controller = new RelatorioController();
  let voltar = false;

  while (!voltar) {
    console.log('\n=== Menu Relatórios ===');
    console.log('1. Livros disponíveis');
    console.log('2. Livros emprestados');
    console.log('3. Livros cadastrados por autor');
    console.log('4. Quantidade de empréstimos por livro');
    console.log('5. Clientes com empréstimos ativos');
    console.log('0. Voltar ao menu principal');

    switch (readlineSync.question('Escolha uma opção: ')) {
      case '1': await controller.livrosDisponiveis(); break;
      case '2': await controller.livrosEmprestados(); break;
      case '3': await controller.livrosPorAutor(); break;
      case '4': await controller.quantidadeEmprestimosPorLivro(); break;
      case '5': await controller.clientesComEmprestimosAtivos(); break;
      case '0': voltar = true; break;
      default: console.log('\nOpção inválida.\n');
    }
  }
}