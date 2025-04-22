import CardTipo from "../cardtipo/CardTipo";
import { useState, useEffect } from "react";
import Tipo from "../../../models/Tipo";
import { buscar } from "../../../services/Service";

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