import { RelatorioService } from '../services/RelatorioService';

export class RelatorioController {
  private service = new RelatorioService();

  async livrosDisponiveis(): Promise<void> {
    const dados = await this.service.livrosDisponiveis();
    console.log('\n=== Livros disponíveis ===');
    dados.forEach(l => console.log(`${l.titulo} | Autor: ${l.autor} | Disponíveis: ${l.quantidade_disponivel}`));
    console.log('');
  }

  async livrosEmprestados(): Promise<void> {
    const dados = await this.service.livrosEmprestados();
    console.log('\n=== Livros emprestados no momento ===');
    dados.forEach(l => console.log(`${l.titulo} | Autor: ${l.autor}`));
    console.log('');
  }

  async livrosPorAutor(): Promise<void> {
    const dados = await this.service.livrosPorAutor();
    console.log('\n=== Livros cadastrados por autor ===');
    dados.forEach(d => console.log(`${d.autor}: ${d.total_livros} livro(s)`));
    console.log('');
  }

  async quantidadeEmprestimosPorLivro(): Promise<void> {
    const dados = await this.service.quantidadeEmprestimosPorLivro();
    console.log('\n=== Quantidade de empréstimos por livro (top 10) ===');
    dados.forEach(d => console.log(`${d.titulo}: ${d.total_emprestimos} empréstimo(s)`));
    console.log('');
  }

  async clientesComEmprestimosAtivos(): Promise<void> {
    const dados = await this.service.clientesComEmprestimosAtivos();
    console.log('\n=== Clientes com empréstimos ativos ===');
    dados.forEach(d => console.log(`${d.nome} (${d.email}): ${d.emprestimos_ativos} empréstimo(s) ativo(s)`));
    console.log('');
  }
}