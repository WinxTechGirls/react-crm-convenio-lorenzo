import Tipo from './Tipo';
import Usuario from './Usuario';

export default interface Convenio {
  id?: number | null;
  nome: string;
  preco: number;
  cobertura: string;
  acomodacao : string
  tipo?: Tipo | null;
  usuario?: Usuario | null;
}