import { Link } from 'react-router-dom'
import Tipo from '../../../models/Tipo'

interface CardTipoProps {
    tipo: Tipo
}

function CardTipo({tipo}: CardTipoProps) {
  return (
    <div className='flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-blue-400 text-white font-bold text-2xl'>
                Tipo: {tipo.nome}
            </header>
            
            <div className="flex">
                <Link to={`/editartipo/${tipo.id}`}
                    className='w-full text-slate-100 bg-cyan-600 hover:bg-cyan-900 
                    flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletartipo/${tipo.id}`} 
                    className='text-slate-100 bg-red-400 hover:bg-red-700 w-full 
                        flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>

        </div>
  )
}

export default CardTipo