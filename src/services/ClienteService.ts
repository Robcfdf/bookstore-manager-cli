import { ClienteRepository } from '../repositories/ClienteRepository';
import { Cliente } from '../models/Cliente';
import { AppError } from '../utils/AppError';
import { validarTextoObrigatorio, validarEmail } from '../utils/validadores';

export class ClienteService {
  private repository = new ClienteRepository();

  async cadastrar(nome: string, email: string, telefone: string): Promise<Cliente> {
    validarTextoObrigatorio(nome, 'nome');
    validarEmail(email);
    if (await this.repository.findByEmail(email)) {
      throw new AppError('Já existe um cliente cadastrado com este e-mail.');
    }
    return this.repository.create(new Cliente(nome, email, telefone));
  }

  async listar(): Promise<Cliente[]> {
    return this.repository.findAll();
  }

  async buscarPorId(id: number): Promise<Cliente> {
    const cliente = await this.repository.findById(id);
    if (!cliente) throw new AppError('Cliente não encontrado.');
    return cliente;
  }

  async atualizar(id: number, nome: string, email: string, telefone: string): Promise<Cliente> {
    await this.buscarPorId(id);
    validarTextoObrigatorio(nome, 'nome');
    validarEmail(email);
    const existente = await this.repository.findByEmail(email);
    if (existente && existente.id !== id) throw new AppError('Já existe outro cliente com este e-mail.');
    const atualizado = await this.repository.update(id, new Cliente(nome, email, telefone, id));
    if (!atualizado) throw new AppError('Não foi possível atualizar o cliente.');
    return atualizado;
  }

  async remover(id: number): Promise<void> {
    await this.buscarPorId(id);
    if (await this.repository.possuiEmprestimos(id)) {
      throw new AppError('Não é possível remover: existem empréstimos vinculados a este cliente.');
    }
    await this.repository.delete(id);
  }
}