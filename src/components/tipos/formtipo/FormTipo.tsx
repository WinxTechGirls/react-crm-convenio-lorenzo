import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tipo from "../../../models/Tipo";
import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormTipo() {

    const navigate = useNavigate();

    const [tipo, setTipo] = useState<Tipo>({
        id: null,
        nome : ''
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/tipos/${id}`, setTipo)
        } catch (error: any) {
            if (error.toString().includes('403')) {
                alert('Erro ao acessar tipos!')
            }
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTipo({
            ...tipo,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        navigate("/tipos")
    }

    async function gerarNovoTipo(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/tipos`, tipo, setTipo)
                alert('O Tipo foi atualizada com sucesso!')
                } catch (error: any) {
                    alert('Erro ao atualizar o Tipo.')
                }

            }
        else {
            try {
                await cadastrar(`/tipos`, tipo, setTipo)
                alert('O Tipo foi cadastrado com sucesso!')
            } catch (error: any) {
                alert('Erro ao cadastrar o tipo.')
            }

        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? 'Cadastrar Tipo' : 'Editar Tipo'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTipo}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome">Nome do Tipo</label>
                    <input
                        type="text"
                        placeholder="Escreva o nome do Tipo"
                        name='nome'
                        className="border-2 border-slate-700 rounded p-2"
                        value={tipo.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400 
                               hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">
                    {isLoading ?
                        <p>carregando...</p> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>

                    }
                </button>
            </form>
        </div>
    );
}

export default FormTipo;