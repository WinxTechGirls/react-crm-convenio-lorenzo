import CardTipo from "../cardtipo/CardTipo";
import { useState, useEffect } from "react";
import Tipo from "../../../models/Tipo";
import { buscar } from "../../../services/Service";
import { Link } from "react-router-dom";

function ListaTipos() {

    const [tipos, setTipo] = useState<Tipo[]>([]);

    async function buscarCategoria() {
        try {
            await buscar('/tipos', setTipo);
        } catch (error: any) {
            console.error("Erro ao buscar tipos:", error);
        }
    }

    useEffect(() => {
        buscarCategoria();
    }, []);

    return (
        <>
            <div className="flex justify-center w-full my-4">
                <Link to='/cadastrartipo' className='hover:underline'>
                    <button className='bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition'>Cadastrar Novo Tipo de Cobertura</button>
                </Link>
            </div>
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tipos.map((tipo) => (
                            <CardTipo key={tipo.id} tipo={tipo} />
                        ))}
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default ListaTipos;