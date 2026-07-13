import { pool } from '../database/connection';
import { Livro } from '../models/Livro';

export class LivroRepository {
  async create(livro: Livro): Promise<Livro> {
    const result = await pool.query(
      `INSERT INTO livros (titulo, autor_id, quantidade_total, quantidade_disponivel)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [livro.titulo, livro.autor_id, livro.quantidade_total, livro.quantidade_disponivel]
    );
    return result.rows[0];
  }

  async findAll(): Promise<any[]> {
    const result = await pool.query(
      `SELECT l.*, a.nome AS autor_nome
       FROM livros l
       INNER JOIN autores a ON a.id = l.autor_id
       ORDER BY l.id`
    );
    return result.rows;
  }

  async findById(id: number): Promise<Livro | null> {
    const result = await pool.query('SELECT * FROM livros WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async update(id: number, livro: Livro): Promise<Livro | null> {
    const result = await pool.query(
      `UPDATE livros SET titulo = $1, autor_id = $2, quantidade_total = $3, quantidade_disponivel = $4
       WHERE id = $5 RETURNING *`,
      [livro.titulo, livro.autor_id, livro.quantidade_total, livro.quantidade_disponivel, id]
    );
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM livros WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }

  async atualizarDisponibilidade(id: number, quantidade_disponivel: number): Promise<void> {
    await pool.query('UPDATE livros SET quantidade_disponivel = $1 WHERE id = $2', [quantidade_disponivel, id]);
  }

  async possuiEmprestimos(id: number): Promise<boolean> {
    const result = await pool.query('SELECT 1 FROM emprestimos WHERE livro_id = $1 LIMIT 1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}