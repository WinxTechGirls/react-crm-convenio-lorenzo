
import axios from "axios"

const api = axios.create({
  baseURL: ''
})

export const cadastrarUsuario = async (url: string, dados: any, setUsuario: Function) => {
  const resposta = await api.post(url, dados);
  setUsuario(resposta.data);
}

export const atualizarUsuario = async (url: string, dados: any) => {
  const resposta = await api.put(url, dados);
  return resposta.data;
};

export const deletarUsuario = async (url: string) => {
  const resposta = await api.delete(url);
  return resposta.data;
};