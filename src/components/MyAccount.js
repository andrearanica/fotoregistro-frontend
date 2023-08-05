import { useState } from 'react'
import axios from 'axios'

export default function MyAccount (props) {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    const [result, setResult] = useState(null)

    const handleChangeName = event => {
        setName(event.target.value)
    }

    const handleChangeSurname = event => {
        setSurname(event.target.value)
    }

    const handleUpdateInfo = event => {
        event.preventDefault()
        axios({
            method: 'PUT',
            url: `http://localhost:8000/api/users`,
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            },
            data: {
                name: name,
                surname: surname
            }
        })
        .then(res => {
            if (res.status === 200) {
                setResult(true)
            } else {
                setResult(false)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <>
        <button type='button' className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#my-account-modal'>Il tuo account</button>

        <div className='modal fade' id='my-account-modal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                <div className='modal-header'>
                    <h1 className='modal-title fs-5' id='exampleModalLabel'>Il tuo account</h1>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div className='modal-body'>
                    <form onSubmit={ handleUpdateInfo }>
                        <label htmlFor='name'>Nome</label>
                        <input id='name' className='form-control my-2 text-center' onChange={ handleChangeName } />
                        <label htmlFor='surname'>Surname</label>
                        <input id='surname' className='form-control my-2 text-center' onChange={ handleChangeSurname } />
                        <input type='submit' className='form-control my-2 btn btn-success' />
                    </form>
                    {
                        result ? <div className='alert alert-success text-center my-4'><b>Informazioni aggiornate correttamente</b>, ricarica la pagina per vedere le modifiche</div> : 
                        result !== null ? <div className='alert alert-warning text-center my-4'><b>Qualcosa è andato storto!</b></div> : 
                        null
                    }
                </div>
                </div>
            </div>
        </div>
        </>
    )

}