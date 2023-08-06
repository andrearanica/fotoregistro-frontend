import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function ClassroomPage () {

    const [classroom, setClassroom] = useState({})
    const [id] = useState(useParams().id)
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [role, setRole] = useState('')

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:8000/api/auth-info',
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => {
            setUser(res.data.user)
        })
        .catch(res => {
            setUser({})
        })
    }, [''])

    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://localhost:8000/api/users/${ user.id }/classrooms/${ classroom.id }`,
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => {
            setRole(res.data[0].role)
        })
        .catch(err => console.log(err))
    }, [''])

    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://localhost:8000/api/classrooms/${ id }`,
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => setClassroom(res.data))
        .catch(err => console.log(err))
    }, [''])

    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://localhost:8000/api/classrooms/${ id }/users`,
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => {
            setUsers(res.data)
        })
        .catch(err => console.log(err))
    }, [''])

    return (
        <div className='container my-4 text-center'>
            <h1>Classe { classroom.name }</h1>
            <p>Descrizione: { classroom.description }</p>
            <div className='my-4'>
                <h4>Membri</h4>
                <center><table className='table text-center'>
                <th>Nome</th><th>Cognome</th>
                <tbody>
                {
                    users.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>{ user.name }</td><td>{ user.surname }</td>
                                { role === 'admin' ? <td><button className='btn'>🗑️</button></td> : null }
                            </tr>
                        )
                    })
                }
                </tbody>
                </table></center>
            </div>
        </div>
    )
    
}