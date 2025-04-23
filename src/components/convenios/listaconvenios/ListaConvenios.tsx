import { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import Convenio from "../../../models/Convenio";
import { buscar } from "../../../services/Service";
import CardConvenio from "../cardconvenio/CardConvenio";
import { Link } from "react-router-dom";

function ListarConvenios() {
const [convenios, setConvenios] = useState<Convenio[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(true);

async function buscarConvenio() {
    setIsLoading(true);
    try {
    await buscar('/convenios', setConvenios);
    } catch (error: any) {
        alert('Erro ao carregar convênios.');
    } finally {
    setIsLoading(false);
    }
}

useEffect(() => {
    buscarConvenio();
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
            <Link to='/cadastrarconvenio' className='hover:underline'>
                <button className='bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition'>Cadastrar Novo Convênio</button>
            </Link>
        </div>
        <div className="flex justify-center w-full my-4">
            <div className="container flex flex-col">
                {convenios.length === 0 && !isLoading ? (
                <p className="text-center text-xl">Nenhum convênio encontrado.</p>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {convenios.map((convenio) => (
                    <CardConvenio key={convenio.id} convenio={convenio} />
                    ))}
                </div>
                )}
            </div>
        </div>
        
    </>
);
}

export default ListarConvenios;