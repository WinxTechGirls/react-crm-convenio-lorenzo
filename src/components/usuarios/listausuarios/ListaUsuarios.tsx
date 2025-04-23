import { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import Usuario from "../../../models/Usuario";
import { buscar } from "../../../services/Service";
import CardUsuario from "../cardusuario/CardUsuario";
import { Link } from "react-router-dom";

function ListaUsuarios() {
const [usuarios, setUsuarios] = useState<Usuario[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(true);

async function buscarUsuario() {
    setIsLoading(true);
    try {
    await buscar('/usuarios/all', setUsuarios);
    } catch (error: any) {
        alert('Erro ao carregar usuários.');
    } finally {
    setIsLoading(false);
    }
}

useEffect(() => {
    buscarUsuario();
  }, []); // 

if (isLoading) {
    return (
    <div className="flex justify-center items-center h-[60vh]">
        <DNA
        visible={true}
        height="200"
        width="200"
        ariaLabel="dna-loading"
        wrapperClass="dna-wrapper mx-auto"
        />
    </div>
    );
}

return (
    <>
        <div className="flex justify-center w-full my-4">
            <Link to='/cadastro' className='hover:underline'>
                <button className='bg-blue-600 text-white py-4 px-4 rounded-lg hover:bg-blue-700 transition'>Cadastrar Novo Usuario</button>
            </Link>
        </div>
        <div className="flex justify-center w-full my-4">
            <div className="container flex flex-col">
                {usuarios.length === 0 && !isLoading ? (
                <p className="text-center text-xl">Nenhum usuário encontrado.</p>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {usuarios.map((usuario) => (
                    <CardUsuario key={usuario.id} usuario={usuario} />
                    ))}
                </div>
                )}
            </div>
        </div>
        
    </>
);
}

export default ListaUsuarios;