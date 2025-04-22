
function Home() {
    return (
        <>
            <div className="bg-blue-800 flex justify-center">
                <div className='container grid grid-cols-2 text-white'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-extrabold'>
                              Convênio Médico Lorenzo
                        </h2>

                        <p className='text-2xl'>
                            Cuidando de você com excelência
                        </p>
                         
                    </div>
                </div>
            </div>
            <div className='flex items-start'>
    <div className="flex flex-col gap-2">
        <h3 className='text-3xl font-extrabold mt-30 mb-5 ml-30 text-blue-800'>
            Cuide da sua saúde com o Convênio Lorenzo 
        </h3>
        <p className='text-xl ml-30 text-blue-800'>
            O Convênio Médico Lorenzo é a escolha ideal para quem busca um <br />
            atendimento de excelência e um cuidado especial para toda a família. <br /> Com uma rede credenciada que inclui os melhores hospitais, clínicas <br /> e profissionais de saúde, garantindo que você tenha acesso a uma <br />assistência médica completa e confiável sempre que precisar. <br /> Nossos benefícios incluem consultas em diversas especialidades <br /> médicas, exames laboratoriais e de imagem, além de atendimento <br />  de urgência e emergência 24 horas. Também internações hospitala_ <br />res e programas de prevenção e promoção à saúde, assegurando <br /> que você e seus entes queridos estejam sempre bem cuidados. <br />
            <br />            
    
            <div className='font-extrabold text-blue-800'>Escolha o Convênio Médico Lorenzo e experimente a <br /> tranquilidade de saber que sua saúde está em boas mãos!</div>
            
            
        </p>
    </div>
    <div className='flex justify-center ml-5'>
        <img
            src="src\assets\imagens\lorenzo.jpg"
            alt=""
            className='w-1/2 '
        />
    </div>
</div>
            
        </>
    )
}

export default Home