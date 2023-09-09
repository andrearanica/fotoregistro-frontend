import { useState } from 'react'
import axios from 'axios'

export default function CreateClass (props) {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [result, setResult] = useState(0)     // 0 nothing, 1 error, 2 ok

    const handleChangeName = event => {
        setName(event.target.value)
    }

    const handleChangeDescription = event => {
        setDescription(event.target.value)
    }

    const handleCreateClassroom = event => {
        event.preventDefault()
        axios({
            method: 'POST',
            url: 'http://192.168.1.95:8000/api/classrooms',
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            },
            data: {
                name: name,
                description: description
            }
        })
        .then(() => setResult(2))
        .catch(err => {
            setResult(1)
            console.log(err)
        })
    }

    return (
        <div className='my-4'>
            <button type='button' className='btn' data-bs-toggle='modal' data-bs-target='#create-classroom-modal'>
                <h2>🎉</h2>Creare una classe
            </button>
            <div className='modal fade' id='create-classroom-modal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                <div className='modal-header'>
                    <h1 className='modal-title fs-5' id='create-classroom-modal'>Crea classe</h1>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div className='modal-body'>
                    <form className='my-4' onSubmit={ handleCreateClassroom }>
                        <label htmlFor='name'>Nome</label>
                        <input id='name' className='form-control my-2 text-center' onChange={ handleChangeName } />
                        <label htmlFor='description'>Descrizione</label>
                        <input id='description' className='form-control my-2 text-center' onChange={ handleChangeDescription } />
                        <input type='submit' className='btn btn-success my-2' />
                    </form>
                    {
                        result === 1 ? <div className='alert alert-danger my-4 p-4'><b>Dati non validi</b>, riprova</div> :
                        result === 2 ? <div className='alert alert-success my-4 p-4'><b>Operazione eseguita con successo</b></div> : null
                    }
                </div>
                </div>
            </div>
            </div>
        </div>
    )

}