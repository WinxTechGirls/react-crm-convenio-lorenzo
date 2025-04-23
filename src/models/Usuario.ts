import Convenio from "./Convenio";

interface Usuario {
  id: number | null;
  nome: string;
  email: string;
  senha: string;
  foto?: string;
  precoPagar: number;
  convenio?: Convenio;
  codigo?: string;
}

export default Usuario;
