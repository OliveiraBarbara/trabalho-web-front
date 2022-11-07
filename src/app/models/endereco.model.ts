import { Cidade } from './cidade.model';
export interface Endereco {
  rua: string;
  num: number;
  bairro: string;
  cep: string;
  cidade: Cidade;
  complemento: string;
  dataCreate: Date;
  lastUpdated: Date;
  id: number;
}
