import Usuario from "../../../models/Usuario"

interface CardUsuarioProps {
    usuario: Usuario
}
function CardUsuario({ usuario }: CardUsuarioProps) {

	return (
        <div className='border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-indigo-800 text-white font-bold text-2xl'>
                <div className="w-30 h-30 overflow-hidden">
                    <img
                        className="rounded-full w-full h-full object-cover"
                        src={usuario?.foto || 'https://www.svgrepo.com/show/192244/man-user.svg'}
                        alt={`Foto de perfil de ${usuario.nome}`}
                    />
                </div>
                <h4 className='text-lg font-semibold uppercase'>{usuario.nome}</h4>
            </header>    
            <div>
                <div className='p-4 '>
                    <p>Email: {usuario.email}</p>
                    <p>Convenio: {usuario.convenio?.nome}</p>
                    <p>Tipo de Cobertura: {usuario.convenio?.tipo?.nome}</p>
                </div>
            </div>
            <div className="flex">
                <button>Editar</button>
                <button>Deletar</button>
            </div>
        </div>

	)
}

export default CardUsuario