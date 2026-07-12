import { testarConexao } from './database/connection';
import { menuPrincipal } from './menus/menuPrincipal';

async function main() {
  await testarConexao();
  await menuPrincipal();
  process.exit(0);
}

main();