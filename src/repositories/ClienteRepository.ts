import { pool } from '../database/connection';
import { Cliente } from '../models/Cliente';

export class ClienteRepository {
  async create(cliente: Cliente): Promise<Cliente> {
    const result = await pool.query(
      'INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *',
      [cliente.nome, cliente.email, cliente.telefone]
    );
    return result.rows[0];
  }

  async findAll(): Promise<Cliente[]> {
    const result = await pool.query('SELECT * FROM clientes ORDER BY id');
    return result.rows;
  }

  async findById(id: number): Promise<Cliente | null> {
    const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async findByEmail(email: string): Promise<Cliente | null> {
    const result = await pool.query('SELECT * FROM clientes WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  async update(id: number, cliente: Cliente): Promise<Cliente | null> {
    const result = await pool.query(
      'UPDATE clientes SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *',
      [cliente.nome, cliente.email, cliente.telefone, id]
    );
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }

  async possuiEmprestimos(id: number): Promise<boolean> {
    const result = await pool.query('SELECT 1 FROM emprestimos WHERE cliente_id = $1 LIMIT 1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}
