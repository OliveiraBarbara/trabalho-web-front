import { Endereco } from './endereco.model';

export interface Admin {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  numReg: number;
  cargo: string;
  formacao: string;
  horaTrabalho: string;
  enderecos: Endereco[];
}
