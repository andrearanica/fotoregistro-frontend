import axios from 'axios'
import React, { useState, useEffect } from 'react'
import SubscriptionForm from '../components/SubscriptionForm'
import { Link } from 'react-router-dom'
import CreateClass from '../components/CreateClass'

export default function Dashboard () {
    
    const [user, setUser] = useState({})
    const [classrooms, setClassrooms] = useState([])
    const [loading, setLoading] = useState(true)

    const redirectToLogin = (err) => {
        if (err.data.status === 'Invalid token') {
            window.location = '../login'
        }
    }

    const getClassroomInfo = async (user) => {
        await axios({
            method: 'GET',
            url: `http://192.168.1.95:8000/api/users/${ user.id }/classrooms`,
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => {
            redirectToLogin(res)
            setClassrooms(res.data)
            setLoading(false)
            axios({
                method: 'GET',
                url: `http://192.168.1.95:8000/api/users/${ user.id }/photo`,
                headers: {
                    'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
                }
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
        })
        .catch(res => console.log(res))
    }

    const userInfo = async () => {
        axios({
            method: 'GET',
            url: 'http://192.168.1.95:8000/api/auth-info',
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => {
            redirectToLogin(res)
            setUser(res.data)
            getClassroomInfo(res.data)
        })
        .catch(res => {
            window.location = '../login'
        })
    }

    useEffect(() => {
        userInfo()
    }, [''])

    return (
        
        <div className='container my-4 text-center'>
            <h1>Ciao { user.name } 🤓</h1>
            <h4>Cosa vuoi fare?</h4>
            <div className='row'>
                <div className='col'>
                    <SubscriptionForm user={ user } />
                </div>
                <div className='col'>
                    <CreateClass user={ user } />
                </div>
                <div className='col'>
                    <Link to='../my-account'><button className='btn my-4'><h2>📷</h2>Cambiare la mia foto</button></Link>
                </div>
            </div>
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
                                    <Link to={ `/classroom/${ classroom.id }` } className='btn btn-primary mx-2'>Vai</Link>
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