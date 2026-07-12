export interface IEmprestimo {
  id?: number;
  livro_id: number;
  cliente_id: number;
  data_emprestimo?: Date;
  data_devolucao?: Date | null;
  devolvido?: boolean;
}

export class Emprestimo implements IEmprestimo {
  id?: number;
  livro_id: number;
  cliente_id: number;

  constructor(livro_id: number, cliente_id: number, id?: number) {
    this.livro_id = livro_id;
    this.cliente_id = cliente_id;
    this.id = id;
  }
}