import { Endereco } from './endereco.model';
export interface LocalTreinamento {
  idLocal: number;
  nome: string;
  valor: number;
  horaFunc: string;
  enderecos: Endereco[];
}
