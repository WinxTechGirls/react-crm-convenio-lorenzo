import { Link } from "react-router-dom"

function Navbar() {
    return (
        <>
            <div className='w-full flex justify-center py-4
            			   bg-blue-800 text-white'>
            
                <div className="container flex justify-between font-semibold">
                <Link to='/home' className="text-2xl font-semibold">Convênio Lorenzo</Link>

                    <div className='flex gap-4'>
                        <Link to='/convenios' className='hover:underline'>Convenios</Link>
                        <Link to='/tipos' className='hover:underline'>Tipos de Coberturas</Link>
                        Cadastrar 
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar