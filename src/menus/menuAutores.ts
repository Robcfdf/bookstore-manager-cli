import readlineSync from 'readline-sync';
import { AutorController } from '../controllers/AutorController';

export async function menuAutores(): Promise<void> {
  const controller = new AutorController();
  let voltar = false;

  while (!voltar) {
    console.log('\n=== Menu Autores ===');
    console.log('1. Cadastrar autor');
    console.log('2. Listar autores');
    console.log('3. Consultar autor por id');
    console.log('4. Atualizar autor');
    console.log('5. Remover autor');
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