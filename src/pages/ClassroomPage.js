import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import UserCard from '../components/UserCard'

export default function ClassroomPage () {

    const [classroom_id] = useState(useParams().id)
    const [classroom, setClassroom] = useState({})
    const [classroomUsers, setClassroomUsers] = useState([])
    const [userId, setUserId] = useState('')
    const [role, setRole] = useState('')

    const redirectToLogin = (err) => {
        if (err.data.status === 'Invalid token') {
            window.location = '../login'
        }
    }

    useEffect(() => {
        const getInfo = async () => {
            axios({
                method: 'GET',
                url: 'http://192.168.1.95:8000/api/auth-info/',
                headers: {
                    'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
                }
            })
            .then(res => {
                redirectToLogin(res)
                setUserId(res.data.id)
                axios({
                    method: 'GET',
                    url: `http://192.168.1.95:8000/api/users/${ res.data.id }/classrooms/${ classroom_id }`,
                    headers: {
                        'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
                    }
                })
                .then(res => {
                    redirectToLogin(res)
                    console.log(res)
                    if (res.data.length === 0) {
                        window.location.href = '../dashboard'
                    } else {
                        setRole(res.data.role)
                    }
                })
                .catch(err => {
                    if (err.status === 'Invalid token') {
                        window.location = '../login'
                    }
                })
            })
            .catch(err => {
                if (err.status === 'Invalid token') {
                    window.location = '../login'
                }
            })
        }

       getInfo()
    }, [classroom_id, role])

    const getClassInfo = async () => {
        axios({
            method: 'GET',
            url: `http://192.168.1.95:8000/api/classrooms/${ classroom_id }`,
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => {
            redirectToLogin(res)
            setClassroom(res.data)
            axios({
                method: 'GET',
                url: `http://192.168.1.95:8000/api/classrooms/${ classroom_id }/users/`,
                headers: {
                    'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
                }
            })
            .then(res => {
                redirectToLogin(res)
                setClassroomUsers(res.data.sort((a, b) => (a.surname > b.surname) ? 1 : -1))
            })
            .catch(err => {
                if (err.status === 'Invalid token') {
                    window.location = '../login'
                }
            })
        })
        .catch(err => {
            if (err.status === 'Invalid token') {
                window.location = '../login'
            }
        })
    }

    useEffect(() => {
        getClassInfo()
    }, [''])

    return (
        <div className='container my-4 text-center'>
            <h1>{ classroom.name }</h1>
            { role === 'admin' ? 
            <div className='my-4'><a className='btn btn-primary my-2' data-bs-toggle='collapse' href='#collapseExample' role='button' aria-expanded='false' aria-controls='collapseExample'>Mostra il codice per l'iscrizione</a>
            <div className='collapse my-2' id='collapseExample'>
                <div className='card card-body'>
                    <h3>{ classroom.id }</h3>
                </div>
            </div>
            <Link to='pdf'><button className='btn btn-primary mx-4 my-2'>🖨️ Stampa PDF</button></Link>
            </div> : null }
            { classroom.description ? <h4>{ classroom.description }</h4> : null }
            <hr />
            <center><div className='my-4 row'>
                {
                    classroomUsers.map(u => {
                        return (
                            <div className='col my-4' key={ u.id }>
                                <UserCard reloadClassInfo={ getClassInfo } fatherUserId={ userId } user={ u } classroom={ classroom } role={ role } />
                            </div>  
                        )
                    })
                }
            </div></center>

        </div>
    )
    
}