import { Link } from "react-router-dom"

function Navbar() {
    return (
        <>
            <div className='w-full flex justify-center py-4
            			   bg-blue-800 text-white'>
            
                <div className="container flex justify-between font-semibold">
                <Link to='/home' className="text-2xl font-semibold">Convênio Lorenzo</Link>

                    <div className='flex gap-4'>
                        Convenios 
                        Coberturas 
                        
                        <Link to='/cadastro' className='hover:underline'>Cadastro</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar