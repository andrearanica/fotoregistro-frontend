import axios from 'axios'
import { useState } from 'react'

export default function UserCard (props) {
    const [result, setResult] = useState(0)

    const handleBanUser = event => {
        event.preventDefault()
        axios({
            method: 'DELETE',
            url: `http://localhost:8000/api/users/${ props.user.id }/classrooms/${ props.classroom.id }`,
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => {
            if (res.data.message === 'subscription deleted') {
                setResult(2)
            } else {
                setResult(1)
            }
            console.log(res)
        })
        .catch(err => {
            setResult(1)
            console.log(err)
        })
    }

    return (
        <>
        <div className='card' style={{ width: '18rem' }}>
            { props.user.photo ? 
            <img src={ `http://localhost:8000/images/${ props.user.photo }` } className='card-img-top' alt='...' /> : 
            <img src={ `http://localhost:8000/images/default.jpg` } className='card-img-top' alt='...' /> }
            <div className='card-body'>
                <h5 className='card-title'>{ props.user.name }</h5>
                <p><a href={`mailto:${ props.user.email }`}>{ props.user.email }</a></p>
                { props.role === 'admin' ? <button className='btn btn-danger' onClick={ handleBanUser }>🗑️</button> : null }
            </div>
        </div>
        { result === 2 ? <div className='alert alert-success my-4 p-4'>Utente eliminato con successo</div> :
          result === 1 ? <div className='alert alert-danger my-4 p-4'>Non è stato possibile completare l'operazione</div> : null }
        </>
    )
}