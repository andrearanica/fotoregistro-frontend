import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import UserCard from '../components/UserCard'

export default function ClassroomPage () {

    const [classroom_id] = useState(useParams().id)
    const [classroom, setClassroom] = useState({})
    const [user, setUser] = useState({})
    const [classroomUsers, setClassroomUsers] = useState([])
    const [role, setRole] = useState('')
    const [success, setSuccess] = useState(0)
    const [loading, setLoading] = useState(true)

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
                setUser(res.data.user)
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
    }, [])

    return (
        <div className='container my-4 text-center'>
            <h1>Classe { classroom.name }</h1>
            { role === 'admin' ? 
            <div className='my-4'><a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Mostra il codice per l'iscrizione</a>
            <div class="collapse my-2" id="collapseExample">
                <div class="card card-body">
                    <h3>{ classroom.id }</h3>
                </div>
            </div></div> : null }
            { classroom.description ? <h4>{ classroom.description }</h4> : null }
            <center><div className='my-4 row'>
                {
                    classroomUsers.map(u => {
                        return (
                            <div className='col' key={ u.id }>
                                <UserCard user={ u } classroom={ classroom } role={ role } />
                            </div>  
                        )
                    })
                }
            </div></center>
            { success === 2 ? <div className='alert alert-success'>Operazione completata</div> : 
              success === 1 ? <div className='alert alert-success'>C'è stato un errore, riprova più tardi</div> : null }
        </div>
    )
    
}