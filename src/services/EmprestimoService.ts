import { EmprestimoRepository } from '../repositories/EmprestimoRepository';
import { LivroRepository } from '../repositories/LivroRepository';
import { ClienteRepository } from '../repositories/ClienteRepository';
import { Emprestimo } from '../models/Emprestimo';
import { AppError } from '../utils/AppError';

export class EmprestimoService {
  private repository = new EmprestimoRepository();
  private livroRepository = new LivroRepository();
  private clienteRepository = new ClienteRepository();

  async registrarEmprestimo(livro_id: number, cliente_id: number): Promise<Emprestimo> {
    const livro = await this.livroRepository.findById(livro_id);
    if (!livro) throw new AppError('Livro não encontrado.');

    const cliente = await this.clienteRepository.findById(cliente_id);
    if (!cliente) throw new AppError('Cliente não encontrado.');

    if (livro.quantidade_disponivel <= 0) {
      throw new AppError('Livro indisponível para empréstimo no momento.');
    }

    const criado = await this.repository.create(new Emprestimo(livro_id, cliente_id));
    await this.livroRepository.atualizarDisponibilidade(livro_id, livro.quantidade_disponivel - 1);
    return criado;
  }

  async registrarDevolucao(id: number): Promise<void> {
    const emprestimo = await this.repository.findById(id);
    if (!emprestimo) throw new AppError('Empréstimo não encontrado.');
    if (emprestimo.devolvido) throw new AppError('Este empréstimo já foi devolvido.');

    await this.repository.registrarDevolucao(id);

    const livro = await this.livroRepository.findById(emprestimo.livro_id);
    if (livro) {
      await this.livroRepository.atualizarDisponibilidade(livro.id!, livro.quantidade_disponivel + 1);
    }
  }

  async listar(): Promise<any[]> {
    return this.repository.findAll();
  }
}