export interface IAutor {
  id?: number;
  nome: string;
  nacionalidade: string;
}

export class Autor implements IAutor {
  id?: number;
  nome: string;
  nacionalidade: string;

  constructor(nome: string, nacionalidade: string, id?: number) {
    this.nome = nome;
    this.nacionalidade = nacionalidade;
    this.id = id;
  }
}