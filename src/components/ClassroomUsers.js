import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ClassroomUsers (props) {
    
    const [users, setUsers] = useState([])    

    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://localhost:8000/api/classrooms/${ props.classroom_id }/users`,
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => {
            setUsers([res.data])
            console.log(users)
        })
        .catch(err => console.log(err))
    }, [''])
    
    return (
        <div>
            { users.map(user => console.log(user)) }
        </div>
    )
}