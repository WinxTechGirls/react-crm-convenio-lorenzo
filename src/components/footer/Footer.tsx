import { FacebookLogo, InstagramLogo} from '@phosphor-icons/react'

function Footer() {

    let data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center bg-blue-800 text-white">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xl font-semibold'>
                            Convênio Médico Lorenzo| Copyright: {data}
                        </p>
                    <p className='text-lg'>Acesse nossas redes sociais</p>
                    <div className='flex gap-2'>
                        <InstagramLogo size={48} weight='bold' />
                        <FacebookLogo size={48} weight='bold' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer