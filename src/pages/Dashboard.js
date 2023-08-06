import axios from 'axios'
import { useState, useEffect } from 'react'
import SubscriptionForm from '../components/SubscriptionForm'
import { Link } from 'react-router-dom'
import CreateClass from '../components/CreateClass'

export default function Dashboard () {
    
    const [user, setUser] = useState({})
    const [classrooms, setClassrooms] = useState([])
    const [loading, setLoading] = useState(true)

    const getClassroomInfo = async (user) => {
        await axios({
            method: 'GET',
            url: `http://localhost:8000/api/users/${ user.id }/classroom`,
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => {
            setClassrooms(res.data)
            setLoading(false)
        })
        .catch(res => console.log(res))
    }

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
            getClassroomInfo(res.data.user)
        })
        .catch(res => {
            setUser({})
        })
    }, [''])

    return (
        
        <div className='container my-4 text-center'>
            <h1>Ciao { user.name } 🤓</h1>
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