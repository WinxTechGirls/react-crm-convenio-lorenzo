import { Link } from 'react-router-dom'
import Convenio from '../../../models/Convenio'

interface CardConvenioProps {
    convenio: Convenio
}

function CardConvenio({ convenio }: CardConvenioProps) {
    return (

        <div className='border border-gray-300 rounded-lg flex flex-col overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg'>
                
            <div>
                <div className='p-4 bg-gray-50'>
                    <h4 className='text-lg font-semibold uppercase'>{convenio.nome}</h4>
                    <div className='text-gray-700'>
                        <p>Cobertura: {convenio.cobertura}</p>
                        <p>Acomadação: {convenio.acomodacao}</p>
                        <p>Preço: {convenio.preco}</p>
                    </div>

                </div>
            </div>
            <div className="flex justify-between p-4 bg-gray-100">
                <Link to={`/editarconvenio/${convenio.id}`}>
                    <button className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition'>Editar</button>
                </Link>
                <Link to={`/deletarconvenio/${convenio.id}`} >
                    <button className='bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition'>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardConvenio