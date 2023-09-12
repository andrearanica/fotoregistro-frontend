import axios from 'axios'
import { useState, useEffect } from 'react'

export default function UserCard (props) {
    const [result, setResult] = useState(0)
    const [userClassroom, setUserClassroom] = useState({})

    const handleBanUser = event => {
        event.preventDefault()
        axios({
            method: 'DELETE',
            url: `http://192.168.1.95:8000/api/users/${ props.user.id }/classrooms/${ props.classroom.id }`,
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
            window.location.reload()
            console.log(res)
        })
        .catch(err => {
            setResult(1)
            console.log(err)
        })
    }

    useEffect(() => {
        const getUserRole = () => {
            axios({
                method: 'GET',
                url: `http://192.168.1.95:8000/api/users/${ props.user.id }/classrooms/${ props.classroom.id }`,
                headers: {
                    'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
                }
            })
            .then(res => setUserClassroom(res.data))
            .catch(err => console.error(err))
        }

        getUserRole()
    }, [''])

    const handleMakeAdmin = event => {
        event.preventDefault()
        axios({
            method: 'PUT',
            url: `http://192.168.1.95:8000/api/users/${ props.user.id }/classrooms/${ props.classroom.id }`,
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            },
            data: {
                role: 'admin'
            }
        })
        .then(() => {
            setResult(2)
            window.location.reload()
        })
        .catch(() => setResult(1))
    }

    const handleMakeStudent = event => {
        event.preventDefault()
        axios({
            method: 'PUT',
            url: `http://192.168.1.95:8000/api/users/${ props.user.id }/classrooms/${ props.classroom.id }`,
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            },
            data: {
                role: 'student'
            }
        })
        .then(() => {
            setResult(2)
            window.location.reload()
        })
        .catch(() => setResult(1))
    }

    return (
        <div>
        <div className='card mx-2' style={{ width: '15rem' }}>
            <h5><span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{ userClassroom.role === 'admin' ? 'Admin' : userClassroom.role === 'student' ? 'Studente' : null }</span></h5>
            { props.user.photo ? 
            <img src={ `http://192.168.1.95:8000/images/${ props.user.photo }` } className='card-img-top' alt='...' /> : 
            <img src={ `http://192.168.1.95:8000/images/default.jpg` } className='card-img-top' alt='...' /> }
            <div className='card-body'>
                <h5 className='card-title'>{ props.user.name } { props.user.surname } </h5>
                <p><a href={`mailto:${ props.user.email }`}>{ props.user.email }</a></p>
                { props.role === 'admin' && props.fatherUserId !== props.user.id ? <button className='btn btn-danger' onClick={ handleBanUser }>🗑️</button> : null }
                { props.role === 'admin' && props.fatherUserId !== props.user.id ? 
                    userClassroom.role === 'student' ? <button className='btn btn-success mx-2' onClick={ handleMakeAdmin }>⬆️</button> :
                    userClassroom.role === 'admin'   ? <button className='btn btn-success mx-2' onClick={ handleMakeStudent }>⬇️</button> : null
                : null }
            </div>
        </div>
        { result === 2 ? <div className='alert alert-success my-4 p-4'>Operazione completata con successo</div> :
          result === 1 ? <div className='alert alert-danger my-4 p-4'>Non è stato possibile completare l'operazione</div> : null }
        </div>
    )
} 