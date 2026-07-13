import readlineSync from 'readline-sync';
import { LivroController } from '../controllers/LivroController';

export async function menuLivros(): Promise<void> {
  const controller = new LivroController();
  let voltar = false;

  while (!voltar) {
    console.log('\n=== Menu Livros ===');
    console.log('1. Cadastrar livro');
    console.log('2. Listar livros');
    console.log('3. Consultar livro por id');
    console.log('4. Atualizar livro');
    console.log('5. Remover livro');
    console.log('0. Voltar ao menu principal');

    switch (readlineSync.question('Escolha uma opção: ')) {
      case '1': await controller.cadastrar(); break;
      case '2': await controller.listar(); break;
      case '3': await controller.consultar(); break;
      case '4': await controller.atualizar(); break;
      case '5': await controller.remover(); break;
      case '0': voltar = true; break;
      default: console.log('\nOpção inválida.\n');
    }
  }
}