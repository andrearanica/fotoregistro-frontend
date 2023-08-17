import axios from 'axios'
import React, { useState, useEffect } from 'react'
import SubscriptionForm from '../components/SubscriptionForm'
import { Link } from 'react-router-dom'
import CreateClass from '../components/CreateClass'
import UploadImage from '../components/UploadImage'

export default function Dashboard () {
    
    const [user, setUser] = useState({})
    const [classrooms, setClassrooms] = useState([])
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState('')
    const [result, setResult] = useState(0)

    const getClassroomInfo = async (user) => {
        await axios({
            method: 'GET',
            url: `http://localhost:8000/api/users/${ user.id }/classrooms`,
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => {
            setClassrooms(res.data)
            setLoading(false)
            axios({
                method: 'GET',
                url: `http://localhost:8000/api/users/${ user.id }/photo`,
                headers: {
                    'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
                }
            })
            .then(res => {
                setImage(res.data)
                console.log(res)
            })
            .catch(err => console.log(err))
        })
        .catch(res => console.log(res))
    }

    const userInfo = async () => {
        axios({
            method: 'GET',
            url: 'http://localhost:8000/api/auth-info',
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => {
            setUser(res.data.user)
            getClassroomInfo(res.data.user)
        })
        .catch(res => {
            console.error(res)
        })
    }

    useEffect(() => {
        userInfo()
    }, [''])

    const handleDeletePhoto = event => {
        event.preventDefault()
        axios({
            method: 'DELETE',
            url: `http://localhost:8000/api/users/${ user.id }/photo`,
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => setResult(2))
        .catch(err => setResult(1))
    }

    return (
        
        <div className='container my-4 text-center'>
            <h1>Ciao { user.name } 🤓</h1>
            { user.photo ? 
            <div className='my-4'><img style={{ width: 200 }} src={ `http://localhost:8000/${ image }` } alt='User'  /><br /><button className='btn btn-danger my-2' onClick={ handleDeletePhoto }>Elimina foto</button></div> : 
            <UploadImage user={ user } /> }
            { result === 2 ? <div className='alert alert-success my-4 p-4'>Immagine eliminata</div> :
              result === 1 ? <div className='alert alert-success my-4 p-4'>Non è stato possibile eliminare l'immagine</div> : null }
            <SubscriptionForm user={ user } />
            <CreateClass user={ user } />
            <hr />
            <h2>Le tue classi</h2>
            { loading ? <div className="spinner-border text-primary my-4" role="status"><span className="visually-hidden">Loading...</span></div> : null }
            <div className='row text-center my-4'>
            {
                classrooms !== [] ? 
                classrooms.map(classroom => {
                    return (
                        <div className='col' key={ classroom.id }><center>
                            <div className='card' style={{ width: '18rem' }}>
                                <div className='card-body'>
                                    <h5 className='card-title'>{ classroom.name }</h5>
                                    <p className='card-text'>{ classroom.description }</p>
                                    <Link to={ `/classroom/${ classroom.id }` } className='btn btn-primary'>Vai</Link>
                                </div>
                            </div>
                        </center></div>
                    )
                })
                : null
            }
            </div>
        </div>
    )
}