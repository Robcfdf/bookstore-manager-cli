export interface ILivro {
  id?: number;
  titulo: string;
  autor_id: number;
  quantidade_total: number;
  quantidade_disponivel: number;
}

export class Livro implements ILivro {
  id?: number;
  titulo: string;
  autor_id: number;
  quantidade_total: number;
  quantidade_disponivel: number;

  constructor(titulo: string, autor_id: number, quantidade_total: number, quantidade_disponivel: number, id?: number) {
    this.titulo = titulo;
    this.autor_id = autor_id;
    this.quantidade_total = quantidade_total;
    this.quantidade_disponivel = quantidade_disponivel;
    this.id = id;
  }
}