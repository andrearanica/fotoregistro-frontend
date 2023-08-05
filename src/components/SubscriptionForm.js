import { useState } from 'react'
import axios from 'axios'

export default function SubscriptionForm () {
   
    const [class_id, setClass_id] = useState('')
    const [error, setError] = useState(false)

    const handleChangeClass_id = event => {
        setClass_id(event.target.value)
    }

    const handleSubscription = event => {
        event.preventDefault()
        axios({
            method: 'POST',
            url: `http://localhost:8000/api/classroom/subscribe/${ class_id }`,
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            },
            data: {
                classroom_id: class_id
            }
        })
        .then(res => {
            if (res.data !== 1) {
                setError(true)
            }
        })
        .catch(err => console.log(err))
    }
   
   return (
        <div className='alert alert-warning my-4 p-4'>
            <label htmlFor='class-id'>Codice</label>
            <form onSubmit={ handleSubscription }>
                <input className='form-control my-2 text-center' onChange={ handleChangeClass_id } />
                <input type='submit' className='form-control my-2 btn btn-success' />
            </form>
            { error ? <div className='alert alert-danger my-4 p-4'>Codice non valido</div> : null }
        </div>
   )
}