import { useState } from 'react'

export default function PdfSettings () {

    const [showAdmin, setShowAdmin] = useState(true)
    const [showOnlyPhoto, setShowOnlyPhoto] = useState(true)

    const handleChangeShowAdmin = event => {
        setShowAdmin(!event.target.checked)
        console.log(showAdmin)
    }

    const handleChangeShowOnlyPhotos = event => {
        setShowOnlyPhoto(!event.target.checked)
        console.log(showOnlyPhoto)
    }

    const handlePrintPDF = event => {
        event.preventDefault()
        window.location.href = `pdf?show-admin=${ showAdmin }&show-only-photos=${ showOnlyPhoto }`
    }

    return (
        <div className='modal fade' id='pdf-settings-modal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                <div className='modal-header'>
                    <h1 className='modal-title fs-5' id='exampleModalLabel'>Stampa PDF</h1>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div className='modal-body'>
                    <form onSubmit={ handlePrintPDF }>
                        <input type='checkbox' className='my-2' onChange={ handleChangeShowAdmin } /> Mostra admin<br />
                        <input type='checkbox' className='my-2' onChange={ handleChangeShowOnlyPhotos } /> Mostra utenti senza foto<br />
                        <input type='submit' value='Stampa' className='btn btn-success my-2' />
                    </form>
                </div>
                </div>
            </div>
        </div>
    )

}