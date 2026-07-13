import readlineSync from 'readline-sync';
import { ClienteController } from '../controllers/ClienteController';

export async function menuClientes(): Promise<void> {
  const controller = new ClienteController();
  let voltar = false;

  while (!voltar) {
    console.log('\n=== Menu Clientes ===');
    console.log('1. Cadastrar cliente');
    console.log('2. Listar clientes');
    console.log('3. Consultar cliente por id');
    console.log('4. Atualizar cliente');
    console.log('5. Remover cliente');
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