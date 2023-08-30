import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function PdfPage (props) {

    const [classroom, setClassroom] = useState({})
    const [classroomUsers, setClassroomUsers] = useState([])
    const [classroom_id] = useState(useParams().id)
    const [showButton, setShowButton] = useState(true)
    
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

    const handlePrintPdf = () => {
        setShowButton(false)
        window.print()
    }

    return (
        <div className='container my-5 text-center'>
            { showButton ? <button onClick={ handlePrintPdf } className='btn'>🖨️</button> : null }
            <h1>{ classroom.name } </h1>
            <div className='row my-5'> 
            {
                classroomUsers.map(user => {
                    return (
                    <div className='col' key={ user.id }>
                        { user.photo ? <img src={ `http://localhost:8000/images/${ user.photo }` } style={{ width: '200px' }} className='card-img-top' alt='...' /> : <img src={ `http://localhost:8000/images/default.jpg` } style={{ width: '200px' }} className='card-img-top' alt='...' /> }
                        <div className='card-body'>
                            <h5 className='card-title'>{ user.name } { user.surname }</h5>
                        </div>
                    </div>
                    )
                })
            }
            </div>
        </div>
    )

}