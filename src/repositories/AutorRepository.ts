import { pool } from '../database/connection';
import { Autor } from '../models/Autor';

export class AutorRepository {
  async create(autor: Autor): Promise<Autor> {
    const result = await pool.query(
      'INSERT INTO autores (nome, nacionalidade) VALUES ($1, $2) RETURNING *',
      [autor.nome, autor.nacionalidade]
    );
    return result.rows[0];
  }

  async findAll(): Promise<Autor[]> {
    const result = await pool.query('SELECT * FROM autores ORDER BY id');
    return result.rows;
  }

  async findById(id: number): Promise<Autor | null> {
    const result = await pool.query('SELECT * FROM autores WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async update(id: number, autor: Autor): Promise<Autor | null> {
    const result = await pool.query(
      'UPDATE autores SET nome = $1, nacionalidade = $2 WHERE id = $3 RETURNING *',
      [autor.nome, autor.nacionalidade, id]
    );
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM autores WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }

  async possuiLivros(id: number): Promise<boolean> {
    const result = await pool.query('SELECT 1 FROM livros WHERE autor_id = $1 LIMIT 1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}