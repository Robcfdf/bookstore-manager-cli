import { LivroRepository } from '../repositories/LivroRepository';
import { AutorRepository } from '../repositories/AutorRepository';
import { Livro } from '../models/Livro';
import { AppError } from '../utils/AppError';
import { validarTextoObrigatorio, validarNumeroPositivo } from '../utils/validadores';

export class LivroService {
  private repository = new LivroRepository();
  private autorRepository = new AutorRepository();

  async cadastrar(titulo: string, autor_id: number, quantidade_total: number): Promise<Livro> {
    validarTextoObrigatorio(titulo, 'título');
    validarNumeroPositivo(quantidade_total, 'quantidade total');

    const autor = await this.autorRepository.findById(autor_id);
    if (!autor) throw new AppError('Autor informado não existe. Cadastre o autor antes do livro.');

    return this.repository.create(new Livro(titulo, autor_id, quantidade_total, quantidade_total));
  }

  async listar(): Promise<any[]> {
    return this.repository.findAll();
  }

  async buscarPorId(id: number): Promise<Livro> {
    const livro = await this.repository.findById(id);
    if (!livro) throw new AppError('Livro não encontrado.');
    return livro;
  }

  async atualizar(id: number, titulo: string, autor_id: number, quantidade_total: number): Promise<Livro> {
    const atual = await this.buscarPorId(id);
    validarTextoObrigatorio(titulo, 'título');

    const autor = await this.autorRepository.findById(autor_id);
    if (!autor) throw new AppError('Autor informado não existe.');

    const diferenca = quantidade_total - atual.quantidade_total;
    const novaDisponivel = atual.quantidade_disponivel + diferenca;

    const atualizado = await this.repository.update(id, new Livro(titulo, autor_id, quantidade_total, novaDisponivel, id));
    if (!atualizado) throw new AppError('Não foi possível atualizar o livro.');
    return atualizado;
  }

  async remover(id: number): Promise<void> {
    await this.buscarPorId(id);
    if (await this.repository.possuiEmprestimos(id)) {
      throw new AppError('Não é possível remover: existem empréstimos vinculados a este livro.');
    }
    await this.repository.delete(id);
  }
}