import axios from 'axios'
import ClassroomUsers from './ClassroomUsers'

export default function Classroom (props) {

    const handleUnsubscription = event => {
        event.preventDefault()
        axios({
            method: 'PUT',
            url: 'http://localhost:8000/api/classroom/unsubscribe',
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return (
        <div className='container my-4 border padding p-4' style={{ borderRadius: '15px' }}>
            <h4>Classe { props.classroom.name }</h4>
            { props.classroom.description ? <p>{ props.classroom.description }</p> : null }
            <button className='btn btn-danger' onClick={ handleUnsubscription }>Disiscriviti</button><br />
            <p className="d-inline-flex gap-1">
                <a className="btn btn-primary mt-4" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    Mostra utenti
                </a>
            </p>
            <div className="collapse" id="collapseExample">
                <div className="card card-body">
                    <ClassroomUsers classroom_id={ props.classroom.id } />
                </div>
            </div>
        </div>
    )

}