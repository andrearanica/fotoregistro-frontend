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

    useEffect(() => {
        const getInfo = async () => {
            axios({
                method: 'GET',
                url: 'http://localhost:8000/api/auth-info/',
                headers: {
                    'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
                }
            })
            .then(res => {
                setUserId(res.data.id)
                axios({
                    method: 'GET',
                    url: `http://localhost:8000/api/users/${ res.data.id }/classrooms/${ classroom_id }`,
                    headers: {
                        'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
                    }
                })
                .then(res => {
                    console.log(res.data)
                    if (res.data.length === 0) {
                        window.location.href = '../dashboard'
                    } else {
                        setRole(res.data.role)
                    }
                })
                .catch(err => console.error(err))
            })
            .catch(err => console.error(err))
        }

       getInfo()
    }, [classroom_id, role])

    useEffect(() => {
        const getClassInfo = async () => {
            axios({
                method: 'GET',
                url: `http://localhost:8000/api/classrooms/${ classroom_id }`,
                headers: {
                    'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
                }
            })
            .then(res => {
                setClassroom(res.data)
                axios({
                    method: 'GET',
                    url: `http://localhost:8000/api/classrooms/${ classroom_id }/users/`,
                    headers: {
                        'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
                    }
                })
                .then(res => {
                    setClassroomUsers(res.data)
                })
                .catch(err => console.error(err))
            })
            .catch(err => console.error(err))
        }

        getClassInfo()
    }, [''])

    return (
        <div className='container my-4 text-center'>
            <h1>Classe { classroom.name }</h1>
            { role === 'admin' ? 
            <div className='my-4'><a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Mostra il codice per l'iscrizione</a>
            <div className="collapse my-2" id="collapseExample">
                <div className="card card-body">
                    <h3>{ classroom.id }</h3>
                </div>
            </div></div> : null }
            { classroom.description ? <h4>{ classroom.description }</h4> : null }
            <hr />
            <center><div className='my-4 row'>
                {
                    classroomUsers.map(u => {
                        return (
                            <div className='col' key={ u.id }>
                                <UserCard fatherUserId={ userId } user={ u } classroom={ classroom } role={ role } />
                            </div>  
                        )
                    })
                }
            </div></center>

            <Link to='pdf'><button className='btn btn-primary' >Stampa PDF</button></Link>
        </div>
    )
    
}