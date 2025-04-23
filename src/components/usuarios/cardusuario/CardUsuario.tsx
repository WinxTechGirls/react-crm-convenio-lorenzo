import { Link } from "react-router-dom"
import Usuario from "../../../models/Usuario"

interface CardUsuarioProps {
    usuario: Usuario
}

function CardUsuario({ usuario }: CardUsuarioProps) {
    return (
        <div className='border border-gray-300 rounded-lg flex flex-col overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg'>
            <header className='py-4 px-6 bg-blue-800 text-white font-bold text-2xl flex items-center'>
                <div className="w-24 h-24 overflow-hidden rounded-full border-2 border-gray-200 mr-4">
                    <img
                        className="w-full h-full object-cover"
                        src={usuario?.foto || 'https://www.svgrepo.com/show/192244/man-user.svg'}
                        alt={`Foto de perfil de ${usuario.nome}`}
                    />
                </div>
                <h4 className='text-lg font-semibold'>{usuario.nome}</h4>
            </header>
            <div className='p-4 bg-gray-50'>
                <p className='text-gray-700'>Email: <span className='font-medium'>{usuario.email}</span></p>
                <p className='text-gray-700'>Convênio: <span className='font-medium'>{usuario.convenio?.nome}</span></p>
                <p className='text-gray-700'>Tipo de Cobertura: <span className='font-medium'>{usuario.convenio?.tipo?.nome}</span></p>
            </div>
            <div className="flex justify-between p-4 bg-gray-100">
              <Link to={`/editarusuario/${usuario.id}`}>
                <button className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition'>Editar</button>
              </Link>
              <Link to={`/deletarusuario/${usuario.id}`}>
                  <button className='bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition'>Deletar</button>
              </Link>
            </div>
        </div>
    )
}

export default CardUsuario