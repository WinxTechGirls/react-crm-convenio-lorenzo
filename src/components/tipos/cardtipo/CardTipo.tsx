import { Link } from 'react-router-dom'
import Tipo from '../../../models/Tipo'

interface CardTipoProps {
    tipo: Tipo
}

function CardTipo({tipo}: CardTipoProps) {
  return (
    <div className='border border-gray-300 rounded-lg flex flex-col overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg'>
            <header className= 'p-4 bg-gray-50 text-lg font-semibold text-gray-700'>
                Tipo: {tipo.nome}
            </header>
            
            <div className="flex justify-between p-4 bg-gray-100">
                <Link to={`/editartipo/${tipo.id}`}
                    className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletartipo/${tipo.id}`} 
                    className='bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition'>
                    <button>Deletar</button>
                </Link>
            </div>

        </div>
  )
}

export default CardTipo