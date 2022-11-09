import { Endereco } from './endereco.model';
import { Preferencia } from './preferencia.model';

export interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  cpf: string;
  enderecos: Endereco[];
  preferencias: Preferencia[];
}
