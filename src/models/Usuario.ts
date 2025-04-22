interface Usuario {
  id?: number| null;
  nome: string;
  email: string;
  senha: string;
  foto?: string;
  precoPagar: number;
  convenio?: string;
  codigo?: string;
}

export default Usuario;
