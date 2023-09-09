import { useState } from 'react'
import axios from 'axios'

export default function SubscriptionForm (props) {
   
    const [class_id, setClass_id] = useState('')
    const [message, setMessage] = useState('')
    const [result, setResult] = useState(0)

    const handleChangeClass_id = event => {
        setClass_id(event.target.value)
    }

    const handleSubscription = event => {
        event.preventDefault()
        axios({
            method: 'POST',
            url: `http://192.168.1.95:8000/api/users/${ props.user.id }/classrooms/${ class_id }`,
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            },
            data: {
                classroom_id: class_id
            }
        })
        .then(res => {
            console.log(res)
            if (res.data.message === 'Subscription already stored') {
                setMessage('Sei già iscritto a questa classe')
                setResult(1)
            } else {
                setMessage('Iscrizione effettuata con successo')
                setResult(2)
            }
        })
        .catch(err => {
            setMessage('Non è stato possibile effettuare l\'operazione')
            setResult(1)
        })
    }
   
   return (
        <div className='my-4'>
            <button type='button' className='btn' data-bs-toggle='modal' data-bs-target='#join-classroom-modal'>
                <h2>🎫</h2>Unirmi ad una classe
            </button>

            <div className='modal fade' id='join-classroom-modal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                <div className='modal-header'>
                    <h1 className='modal-title fs-5' id='exampleModalLabel'>Unisciti ad una classe</h1>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div className='modal-body'>
                    <label htmlFor='class-id'>Codice</label>
                    <form onSubmit={ handleSubscription }>
                        <input className='form-control my-2 text-center' onChange={ handleChangeClass_id } />
                        <input type='submit' className='form-control my-2 btn btn-success' />
                        { message ? 
                            ( result === 2 ? <div className='alert alert-success my-4 p-4'><p>{ message }</p></div> :
                              result === 1 ? <div className='alert alert-warning my-4 p-4'><p>{ message }</p></div> : null ) 
                        : null }
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
   )
}