import { Link } from 'react-router-dom'
import Convenio from '../../../models/Convenio'

interface CardConvenioProps {
    convenio: Convenio
}

function CardConvenio({ convenio }: CardConvenioProps) {
    return (
        <div className='border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between'>
                
            <div>
                <div className='p-4 '>
                    <h4 className='text-lg font-semibold uppercase'>{convenio.nome}</h4>
                    <p>Cobertura: {convenio.cobertura}</p>
                    <p>Acomadação: {convenio.acomodacao}</p>
                    <p>Preço: {convenio.preco}</p>
                </div>
            </div>
            <div className="flex">
                <Link to={`/editarconvenio/${convenio.id}`}
                    className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
                    flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>
                <Link to={`/deletarconvenio/${convenio.id}`} 
                    className='text-white bg-red-400 
                    hover:bg-red-700 w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardConvenio