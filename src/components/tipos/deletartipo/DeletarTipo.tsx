import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Tipo from "../../../models/Tipo"
import { buscar, deletar } from "../../../services/Service"

function DeletarTipo() {

    const navigate = useNavigate()

    const [tipo, setTipo] = useState<Tipo>({} as Tipo)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/tipos/${id}`, setTipo)
        } catch (error: any) {
            alert('Tipo não encontrada!')
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarTipo() {
        setIsLoading(true)

        try {
            await deletar(`/tipos/${id}`)
            alert('tipo apagado com sucesso!')

        } catch (error: any) {
            alert('Erro ao deletar o tipo.')
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/tipos")
    }
    
    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar tipo</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o tipo a seguir?</p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    Tipo de cobertura : {tipo.nome}
                </header>
                <div className="flex">
                    <button 
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    <button 
                        className='w-full text-slate-100 bg-indigo-400 
                                   hover:bg-indigo-600 flex items-center justify-center'
                                   onClick={deletarTipo}>
                        {isLoading ?
                            <h1>carregano...</h1>
                            :
                            <span>Sim</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarTipo