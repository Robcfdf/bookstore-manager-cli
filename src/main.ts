import { testarConexao } from './database/connection';

async function main() {
  await testarConexao();
}

main();