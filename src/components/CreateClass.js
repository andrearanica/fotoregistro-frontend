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
            url: 'http://localhost:8000/api/classrooms',
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            },
            data: {
                name: name,
                description: description
            }
        })
        .then(res => {
            const id = res.data.id
            axios({
                method: 'POST',
                url: `http://localhost:8000/api/users/${ props.user.id }/classrooms/${ id }`,
                headers: {
                    'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
                },
                data: {
                    classroom_id: id
                }
            })
            .then(res => setResult(2))
            .catch(err => setResult(1))
        })
        .catch(err => setResult(1))
    }

    return (
        <div className='my-4'>
            <a className="btn btn-primary" data-bs-toggle="collapse" href="#create-classroom-form" role="button" aria-expanded="false" aria-controls="collapseExample">
                Crea una classe
            </a>
            <div className='collapse alert alert-warning my-4' id='create-classroom-form'>
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
    )

}