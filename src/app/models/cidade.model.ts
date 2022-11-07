import { Estado } from './estado.model';
export interface Cidade {
  id: number;
  nome: string;
  dataCreate: Date;
  lastUpdated: Date;
  estado: Estado;
}
