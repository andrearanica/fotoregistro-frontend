import axios from 'axios'
import { useState, useEffect } from 'react'
import MyAccount from '../components/MyAccount'
import SubscriptionForm from '../components/SubscriptionForm'
import Classroom from '../components/Classroom'

export default function Dashboard () {
    
    const [user, setUser] = useState({})
    const [classroom, setClassroom] = useState({})

    const getStudentInfo = async () => {
        await axios({
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
            setUser({})
        })
    }

    const getClassroomInfo = async (user) => {
        await axios({
            method: 'GET',
            url: `http://localhost:8000/api/users/${ user.id }/classroom`,
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => setClassroom(res.data))
        .catch(res => console.log(res))
    }

    useEffect(() => {
        getStudentInfo()
    }, [''])

    return (
        <div className='container my-4 text-center'>
            <h1>Ciao { user.name } 🤓</h1>
            <MyAccount user={ user } />
            {
                classroom !== '' ?
                <Classroom classroom={ classroom } /> :
                <SubscriptionForm />
            }
        </div>
    )
}