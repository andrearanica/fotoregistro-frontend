import axios from 'axios'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import MyAccount from '../components/MyAccount'

export default function Dashboard () {
    
    const [user, setUser] = useState({})

    useEffect(() => {
        if (!checkToken(window.localStorage.getItem('token'))) {
            <Navigate to='/' replace={ true } />
        }
    }, [])

    const checkToken = async (token) => {
        await axios({
            url: 'http://localhost:8000/api/auth-info',
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
        .then(res => {
            setUser(res.data.user)
            return true
        })
        .catch(res => {
            setUser({})
            return false
        })
    }
    
    return (
        <div className='container my-4 text-center'>
            <h1>Ciao { user.name } 🤓</h1>
            <MyAccount user={ user } />
        </div>
    )
}