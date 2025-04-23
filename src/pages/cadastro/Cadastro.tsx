
import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Usuario from '../../models/Usuario'
import './Cadastro.css'
import { RotatingLines } from 'react-loader-spinner'
import { atualizar, buscar, cadastrar} from '../../services/Service'
import Convenio from '../../models/Convenio'

function Cadastro() {
  const navigate = useNavigate()
  const [convenios, setConvenios] = useState<Convenio[]>([])
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [usuario, setUsuario] = useState<Usuario>({
    id: null,
    nome: '',
    email: '',
    senha: '',
    precoPagar: 0,
    convenio: undefined,
    codigo: '',
    foto: ''
  })

  const [convenio, setConvenio] = useState<Convenio>({ 
    id: null,
    nome: '',
    preco: 0,
    cobertura: '',
    acomodacao : '',
    tipo: null})

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const updatedUsuario = { ...usuario, [name]: value };

    // Verifica se é o campo código e se contém "DESCONTO10"
    if (name === 'codigo') {
      const descontoAtivo = value === 'DESCONTO10';
      const precoBase = usuario.convenio?.preco || 0;
      
      updatedUsuario.precoPagar = descontoAtivo 
        ? precoBase * 0.9 // Aplica 10% de desconto
        : precoBase; // Mantém o preço original
    }

    setUsuario(updatedUsuario);
    console.log(usuario)
  }

  async function buscarConvenios() {
    try {
        await buscar('/convenios', setConvenios)
    } catch (error: any) {
        alert('Convenios indisponíveis!')
    }
}
  function retornar() {
    navigate('/')
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (id) {
        await atualizar(`/usuarios/atualizar`, usuario, setUsuario)
        alert('Usuário atualizado com sucesso!')
      } else {
        await cadastrar(`/usuarios/cadastrar`, usuario, setUsuario)
        alert('Usuário cadastrado com sucesso!')
        retornar()
      }
    } catch (error) {
      alert('Erro ao cadastrar/atualizar usuário!')
    }
    setIsLoading(false)
  }

  async function deletar(e: any) {
    e.preventDefault()
    setIsLoading(true)
    try {
      await deletar(`/usuarios/deletar/${id}`)
      alert('Usuário deletado com sucesso!')
    } catch (error) {
      alert('Erro ao deletar usuário!')
    }
    setIsLoading(false)
  }

  async function buscarConvenioPorId(id: string) {
    try {
      await new Promise<void>((resolve) => {
        buscar(`/convenios/${id}`, (dados: Convenio) => {
          const descontoAtivo = usuario.codigo === 'DESCONTO10';
          const precoComDesconto = descontoAtivo ? dados.preco * 0.9 : dados.preco;
          
          setUsuario({
            ...usuario,
            precoPagar: precoComDesconto,
            convenio: dados
          })
          resolve()
        })
      })
    } catch (error: any) {
      alert("Convênio não encontrado")
    }
  }

  useEffect(() => {
    buscarConvenios()
  }, [id])

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        <div className="fundoCadastro hidden lg:block"></div>
        <form className='flex justify-center items-center flex-col w-2/3 gap-3' onSubmit={cadastrarNovoUsuario}>
          <h2 className='text-slate-900 text-5xl'>{id ? 'Editar' : 'Cadastrar'}</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" name="nome" placeholder="Nome" className="border-2 border-slate-700 rounded p-2" value={usuario.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Email" className="border-2 border-slate-700 rounded p-2" value={usuario.email} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input type="password" id="senha" name="senha" placeholder="Senha" className="border-2 border-slate-700 rounded p-2" value={usuario.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
          </div>
           <div className="flex flex-col w-full">
            <label htmlFor="convenio">Convênio</label>
            <select name="convenio" id="convenio" className='border p-2 border-slate-800 rounded'
                onChange={(e) => buscarConvenioPorId(e.currentTarget.value)}
            >
                <option value="" selected disabled>Selecione um Convenio</option>

                {convenios.map((convenio) => (
                    <>
                      <option value={convenio.id!} >{convenio.nome}</option>
                    </>
                ))}

            </select>
          </div>
          <div className="flex flex-col w-full">
           <label htmlFor="codigo">Código</label>
           <input type="text" id="codigo" name="codigo" placeholder="Código" className="border-2 border-slate-700 rounded p-2" value={usuario.codigo} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
           {usuario.codigo && usuario.codigo !== 'DESCONTO10' && (
              <span className="text-red-600 text-sm">Cupom inválido</span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="precoPagar">Preço a Pagar</label>
            <input readOnly type="number" id="precoPagar" name="precoPagar" placeholder="Preço a Pagar" className="border-2 border-slate-700 rounded p-2" value={usuario.precoPagar} onChange={(e) => buscarConvenioPorId(e.currentTarget.value)} />
            {usuario.codigo === 'DESCONTO10' && (
            <span className="text-green-600 text-sm">Desconto aplicado!</span>
          )}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input type="text" id="foto" name="foto" placeholder="Foto" className="border-2 border-slate-700 rounded p-2" value={usuario.foto} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
          </div>
          <div className="flex justify-around w-full gap-3">
            <button type="submit" className="rounded text-white bg-indigo-400 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600">
              {id ? 'Atualizar' : 'Cadastrar'}
            </button>
            {id && (
              <button type="button" className="rounded text-white bg-red-400 border-0 py-2 px-6 focus:outline-none hover:bg-red-600" onClick={deletar}>
                Deletar
              </button>
            )}
            <button type="button" className="rounded text-white bg-gray-400 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600" onClick={retornar}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      )}
    </>
  );
}

export default Cadastro;
