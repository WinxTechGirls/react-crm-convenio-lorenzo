import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams} from "react-router-dom";
import Convenio from "../../../models/Convenio";
import Tipo from "../../../models/Tipo";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

function FormConvenio() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tipos, setTipos] = useState<Tipo[]>([])

    const [tipo, setTipo] = useState<Tipo>({ id: 0, nome: '', })
    const [convenio, setConvenio] = useState<Convenio>({} as Convenio)

    const { id } = useParams<{ id: string }>()


    async function buscarConvenioPorId(id: string) {
        try {
            await buscar(`/convenios/${id}`, setConvenio)
        } catch (error: any) {
            alert("Convenio não encontrado!")
        }
    }

    async function buscarTipoPorId(id: string) {
        try {
            await buscar(`/tipos/${id}`, setTipo)
        } catch (error: any) {
            alert("Tipo não encontrado")
        }
    }

    async function buscarTipos() {
        try {
            await buscar('/tipos', setTipos)
        } catch (error: any) {
            alert("Não existem tipos ainda")
        }
    }

    useEffect(() => {
        buscarTipos()

        if (id !== undefined) {
            buscarConvenioPorId(id)
        }
    }, [id])

    useEffect(() => {
        setConvenio({
            ...convenio,
            tipo: tipo,
        })
    }, [tipo])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setConvenio({
            ...convenio,
            [e.target.name]: e.target.value,
            tipo: tipo
        });
        console.log(convenio)
    }

    function retornar() {
        navigate('/convenios');
    }

    async function gerarNovoConvenio(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/convenios`, convenio, setConvenio);
                alert('Convenio atualizada com sucesso')

            } catch (error: any) {
                alert('Erro ao atualizar a Convenio')
            }

        } else {
            try {
                await cadastrar(`/convenios`, convenio, setConvenio)
                alert('Convenio cadastrada com sucesso');
                console.log(convenio);
            } catch (error: any) {
                alert('Erro ao cadastrar a Convenio');
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoTipo = tipo.nome === '';


    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'Editar Convenio' : 'Cadastrar Convenio'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoConvenio}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome">Título do Novo Convenio</label>
                    <input
                        type="text"
                        placeholder="Nome"
                        name="nome"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={convenio.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Cobertura</label>
                    <input
                        type="text"
                        placeholder="Texto"
                        name="cobertura"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={convenio.cobertura}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Acomodação</label>
                    <input
                        type="text"
                        placeholder="Texto"
                        name="acomodacao"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={convenio.acomodacao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Preço</label>
                    <input
                        type="number"
                        placeholder="Texto"
                        name="preco"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={convenio.preco}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Tipo de Cobertura do Convenio</p>
                    <select name="tipo" id="tipo" className='border p-2 border-slate-800 rounded'
                        onChange={(e) => buscarTipoPorId(e.currentTarget.value)}
                    >
                        <option value="" selected disabled>Selecione um Tipo</option>

                        {tipos.map((tipo) => (
                            <>
                                <option value={tipo.id!} >{tipo.nome}</option>
                            </>
                        ))}

                    </select>
                </div>
                <button
                    type='submit'
                    className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center'
                    disabled={carregandoTipo}
                >
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormConvenio;