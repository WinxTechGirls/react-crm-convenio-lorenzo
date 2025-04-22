import Popup from 'reactjs-popup';
import FormConvenio from '../formconvenio/FormConvenio;

import 'reactjs-popup/dist/index.css';
import './ModalConvenio.css'

function ModalConvenio() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                    className='border rounded px-4 py-2 hover:bg-white hover:text-amber-600'>
                    </button>
                }
                modal>
                <FormConvenio />
            </Popup>
        </>
    );
}

export default ModalConvenio;