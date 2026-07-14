import { pool } from '../database/connection';
import { Emprestimo } from '../models/Emprestimo';

export class EmprestimoRepository {
  async create(emprestimo: Emprestimo): Promise<Emprestimo> {
    const result = await pool.query(
      'INSERT INTO emprestimos (livro_id, cliente_id) VALUES ($1, $2) RETURNING *',
      [emprestimo.livro_id, emprestimo.cliente_id]
    );
    return result.rows[0];
  }

  async findAll(): Promise<any[]> {
    const result = await pool.query(
      `SELECT e.id, l.titulo AS livro, c.nome AS cliente, e.data_emprestimo, e.data_devolucao, e.devolvido
       FROM emprestimos e
       INNER JOIN livros l ON l.id = e.livro_id
       INNER JOIN clientes c ON c.id = e.cliente_id
       ORDER BY e.id`
    );
    return result.rows;
  }

  async findById(id: number): Promise<Emprestimo | null> {
    const result = await pool.query('SELECT * FROM emprestimos WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async registrarDevolucao(id: number): Promise<void> {
    await pool.query(
      'UPDATE emprestimos SET devolvido = TRUE, data_devolucao = NOW() WHERE id = $1',
      [id]
    );
  }
}