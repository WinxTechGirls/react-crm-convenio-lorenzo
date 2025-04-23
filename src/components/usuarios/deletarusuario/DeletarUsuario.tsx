import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { buscar, deletar } from "../../../services/Service"
import Usuario from "../../../models/Usuario"

function DeletarUsuario() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [usuario, setUsuario] = useState<Usuario>({} as Usuario)
  const { id } = useParams<{ id: string }>()

  async function buscarPorId(id: string) {
    try {
      await buscar(`/usuarios/${id}`, setUsuario)
    } catch (error: any) {
      alert('id de usuário não existente')
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  async function deletarUsuario() {
    setIsLoading(true)
    try {
      await deletar(`/usuarios/${id}`)
      alert('Usuário apagado com sucesso')
    } catch (error: any) {
      alert('Erro ao deletar o usuário!')
    }
    setIsLoading(false)
    retornar()
  }

  function retornar() {
    navigate("/usuarios")
  }

  return (
    <div className='container w-1/3 mx-auto'>
      <h1 className='text-4xl text-center my-4'>Deletar Usuário</h1>
      <p className='text-center font-semibold mb-4'>
        Você tem certeza de que deseja apagar o usuário a seguir?
      </p>
      <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
          Usuário
        </header>
        <div className="p-4">
          <p className='text-xl h-full'>{usuario.nome}</p>
          <p>{usuario.email}</p>
        </div>
        <div className="flex">
          <button className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2' onClick={retornar}>
            Não
          </button>
          <button className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center' onClick={deletarUsuario}>
            {isLoading ? <p>carregando</p> : <span>Sim</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarUsuario
