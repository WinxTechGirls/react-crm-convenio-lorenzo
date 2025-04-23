import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Usuario from "../../../models/Usuario";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

function FormUsuario() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<Usuario>({} as Usuario);
  const { id } = useParams<{ id: string }>();

  async function buscarUsuarioPorId(id: string) {
    try {
      await buscar(`/usuarios/${id}`, setUsuario);
    } catch (error: any) {
      alert("Usuário não encontrado!");
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarUsuarioPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  }

  function retornar() {
    navigate('/usuarios');
  }

  async function gerarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    if (id !== undefined) {
      try {
        await atualizar(`/usuarios`, usuario, setUsuario);
        alert('Usuário atualizado com sucesso');
      } catch (error: any) {
        alert('Erro ao atualizar o usuário');
      }
    } else {
      try {
        await cadastrar(`/usuarios`, usuario, setUsuario);
        alert('Usuário cadastrado com sucesso');
      } catch (error: any) {
        alert('Erro ao cadastrar o usuário');
      }
    }
    setIsLoading(false);
    retornar();
  }

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? 'Editar Usuário' : 'Cadastrar Usuário'}
      </h1>
      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoUsuario}>
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome</label>
          <input type="text" placeholder="Nome" name="nome" required className="border-2 border-slate-700 rounded p-2" value={usuario.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Email" name="email" required className="border-2 border-slate-700 rounded p-2" value={usuario.email} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="senha">Senha</label>
          <input type="password" placeholder="Senha" name="senha" required className="border-2 border-slate-700 rounded p-2" value={usuario.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
        </div>
        <button type='submit' className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2 flex justify-center'>
          {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> : <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>}
        </button>
      </form>
    </div>
  );
}

export default FormUsuario;
