import { useState } from 'react'
import axios from 'axios'

export default function SubscriptionForm (props) {
   
    const [class_id, setClass_id] = useState('')
    const [error, setError] = useState(0)

    const handleChangeClass_id = event => {
        setClass_id(event.target.value)
    }

    const handleSubscription = event => {
        event.preventDefault()
        axios({
            method: 'POST',
            url: `http://localhost:8000/api/users/${ props.user.id }/classrooms/${ class_id }`,
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            },
            data: {
                classroom_id: class_id
            }
        })
        .then(res => {
            setError(2)
        })
        .catch(err => setError(1))
    }
   
   return (
        <div className='my-4'>
            <a className="btn btn-primary" data-bs-toggle="collapse" href="#subscription-form" role="button" aria-expanded="false" aria-controls="collapseExample">
                Iscriviti ad una classe tramite codice
            </a>
            <div className='collapse' id='subscription-form'>
                <div className='alert alert-warning my-4 p-4'>
                    <label htmlFor='class-id'>Codice</label>
                    <form onSubmit={ handleSubscription }>
                        <input className='form-control my-2 text-center' onChange={ handleChangeClass_id } />
                        <input type='submit' className='form-control my-2 btn btn-success' />
                    </form>
                    { error === 1 ? <div className='alert alert-danger my-4 p-4'>Codice non valido</div> : 
                      error === 2 ? <div className='alert alert-success my-4 p-4'>Iscrizione effettuata correttamente</div> : null}
                </div>
            </div>
        </div>
   )
}