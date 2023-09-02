import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function PdfPage (props) {

    const [classroom, setClassroom] = useState({})
    const [classroomUsers, setClassroomUsers] = useState([])
    const [classroom_id] = useState(useParams().id)
    
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
        <div className='container my-5 text-center'>
            <h1 onClick={ () => window.print() }>{ classroom.name } </h1>
            <center><div className='row my-5'> 
            {
                classroomUsers.map(user => {
                    if (user.photo) {
                        return (
                            <div className='col col-2 my-2' key={ user.id }>
                                { user.photo ? <img src={ `http://localhost:8000/images/${ user.photo }` } style={{ height: '100px', width: 'auto' }} className='card-img-top mb-4' alt='...' /> : <img src={ `http://localhost:8000/images/default.jpg` } style={{ width: '200px' }} className='card-img-top' alt='...' /> }
                                <div className='card-body'>
                                    <h5 className='card-title'>{ user.name } { user.surname }</h5>
                                </div>
                            </div>
                        )
                    } else {
                        return <></>
                    }
                })
            }
            </div></center>
        </div>
    )

}