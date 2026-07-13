import { AutorRepository } from '../repositories/AutorRepository';
import { Autor } from '../models/Autor';
import { AppError } from '../utils/AppError';
import { validarTextoObrigatorio } from '../utils/validadores';

export class AutorService {
  private repository = new AutorRepository();

  async cadastrar(nome: string, nacionalidade: string): Promise<Autor> {
    validarTextoObrigatorio(nome, 'nome');
    validarTextoObrigatorio(nacionalidade, 'nacionalidade');
    return this.repository.create(new Autor(nome, nacionalidade));
  }

  async listar(): Promise<Autor[]> {
    return this.repository.findAll();
  }

  async buscarPorId(id: number): Promise<Autor> {
    const autor = await this.repository.findById(id);
    if (!autor) throw new AppError('Autor não encontrado.');
    return autor;
  }

  async atualizar(id: number, nome: string, nacionalidade: string): Promise<Autor> {
    await this.buscarPorId(id);
    validarTextoObrigatorio(nome, 'nome');
    validarTextoObrigatorio(nacionalidade, 'nacionalidade');
    const atualizado = await this.repository.update(id, new Autor(nome, nacionalidade, id));
    if (!atualizado) throw new AppError('Não foi possível atualizar o autor.');
    return atualizado;
  }

  async remover(id: number): Promise<void> {
    await this.buscarPorId(id);
    if (await this.repository.possuiLivros(id)) {
      throw new AppError('Não é possível remover: existem livros vinculados a este autor.');
    }
    await this.repository.delete(id);
  }
}