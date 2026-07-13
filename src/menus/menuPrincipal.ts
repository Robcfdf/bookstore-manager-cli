import readlineSync from 'readline-sync';
import { menuAutores } from './menuAutores';
import { menuLivros } from './menuLivros';
import { menuClientes } from './menuClientes';

export async function menuPrincipal(): Promise<void> {
  let encerrar = false;

  while (!encerrar) {
    console.log('\n============================================');
    console.log('   BookStore Manager CLI - Menu Principal');
    console.log('============================================');
    console.log('1. Autores');
    console.log('2. Livros');
    console.log('3. Clientes');
    console.log('4. Empréstimos');
    console.log('5. Relatórios');
    console.log('0. Encerrar aplicação');

    const opcao = readlineSync.question('Escolha uma opção: ');

    switch (opcao) {
      case '1':
        await menuAutores();
        break;
      case '2':
        await menuLivros();
        break;
      case '3':
        await menuClientes();
        break;
      case '4':
        console.log('\n Módulo de Empréstimos em construção...\n');
        readlineSync.question('Pressione Enter para voltar ao menu...');
        break;
      case '5':
        console.log('\n Módulo de Relatórios em construção...\n');
        readlineSync.question('Pressione Enter para voltar ao menu...');
        break;
      case '0':
        console.log('\n Encerrando a aplicação. Até logo!');
        encerrar = true;
        break;
      default:
        console.log('\n Opção inválida. Tente novamente.');
    }
  }
}