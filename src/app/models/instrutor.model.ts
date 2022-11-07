import { Endereco } from './endereco.model';
export interface Instrutor {
  cref: string;
  nome: string;
  telefone: string;
  modalidade: string;
  email: string;
  senha: string;
  enderecos: Endereco[];
}
