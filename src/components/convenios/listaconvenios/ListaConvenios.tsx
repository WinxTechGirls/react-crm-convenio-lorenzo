import { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import Convenio from "../../../models/Convenio";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardConvenio from "./CardConvenio"; 

function ListarConvenios() {
const [convenios, setConvenios] = useState<Convenio[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(true);

async function buscarConvenio() {
    setIsLoading(true);
    try {
    await buscar('/convenios', setConvenios);
    } catch (error: any) {
        ToastAlerta('Erro ao carregar convênios.', 'erro');
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
);
}

export default ListarConvenios;