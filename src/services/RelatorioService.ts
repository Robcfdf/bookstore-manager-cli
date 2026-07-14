import { RelatorioRepository } from '../repositories/RelatorioRepository';

export class RelatorioService {
  private repository = new RelatorioRepository();

  async livrosDisponiveis() { return this.repository.livrosDisponiveis(); }
  async livrosEmprestados() { return this.repository.livrosEmprestados(); }
  async livrosPorAutor() { return this.repository.livrosPorAutor(); }
  async quantidadeEmprestimosPorLivro() { return this.repository.quantidadeEmprestimosPorLivro(); }
  async clientesComEmprestimosAtivos() { return this.repository.clientesComEmprestimosAtivos(); }
}