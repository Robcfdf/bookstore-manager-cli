export interface ICliente {
  id?: number;
  nome: string;
  email: string;
  telefone?: string;
}

export class Cliente implements ICliente {
  id?: number;
  nome: string;
  email: string;
  telefone?: string;

  constructor(nome: string, email: string, telefone?: string, id?: number) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.id = id;
  }
}