import { useState, useEffect } from 'react'
import axios from 'axios'
import UploadImage from '../components/UploadImage'

export default function MyAccount () {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [result, setResult] = useState(0)

    const [user, setUser] = useState({})

    const redirectToLogin = (err) => {
        if (err.data.status === 'Invalid token') {
            window.location = '../login'
        }
    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://192.168.1.95:8000/api/auth-info',
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => {
            redirectToLogin(res)
            setName(res.data.name)
            setSurname(res.data.surname)
            setEmail(res.data.email)
            setPhoto(res.data.photo)
            setUser(res.data)
        })
        .catch(err => window.location = '../login')
    }, [''])

    const handleChangeName = event => {
        setName(event.target.value)
    }

    const handleChangeSurname = event => {
        setSurname(event.target.value)
    }

    const handleChangeEmail = event => {
        setEmail(event.target.value)
    }

    const handleChangeOldPassword = event => {
        setOldPassword(event.target.value)
    }

    const handleChangeNewPassword = event => {
        setNewPassword(event.target.value)
    }

    const handleChangeConfirmNewPassword = event => {
        setConfirmNewPassword(event.target.value)
    }

    const handleDeletePhoto = event => {
        event.preventDefault()
        axios({
            method: 'DELETE',
            url: `http://192.168.1.95:8000/api/users/${ user.id }/photo`,
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => setResult(2))
        .catch(err => setResult(1))
    }

    const handleUpdateInfo = event => {
        event.preventDefault()
        axios({
            method: 'PUT',
            url: `http://192.168.1.95:8000/api/users/${ user.id }`,
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            },
            data: {
                name: name,
                surname: surname
            }
        })
        .then(res => setResult(2))
        .catch(err => {
            setResult(1)
            console.error(err)
        })
    }

    return (
        <center>
        <div className='row my-4 container'>
            <h1>Il tuo account</h1>
            <div className='col-lg card my-2 p-4'>
                <h3>Dati anagrafici</h3>
                <form className='my-4' onSubmit={ handleUpdateInfo }>
                    <label htmlFor='name'>Nome</label>
                    <input id='name' className='form-control my-2' value={ name } onChange={ handleChangeName } />
                    <label htmlFor='surname'>Cognome</label>
                    <input id='surname' className='form-control my-2' value={ surname } onChange={ handleChangeSurname } />
                    <label htmlFor='email'>Email</label>
                    <input id='email' readOnly className='form-control my-2' value={ email } onChange={ handleChangeEmail } />
                    <div className='text-center'><input type='submit' className='btn btn-success my-2' value='Modifica'  /></div>
                </form>
            </div> 
            <div className='col-lg card my-2 p-4'>
            <h3>La tua foto</h3>
            { photo ? 
            <div className='my-4 text-center'><img className='mb-4' style={{ maxWidth: 300, borderRadius: '15px' }} src={ `http://192.168.1.95:8000/images/${ photo }` } alt='User'  /><br /><button className='btn btn-danger my-2' onClick={ handleDeletePhoto }>Elimina foto</button></div> : 
            <UploadImage user={ user } /> }
            { result === 2 ? <div className='alert alert-success my-4 p-4 text-center'>Informazioni aggiornate correttamente</div> :
              result === 1 ? <div className='alert alert-success my-4 p-4 text-center'>Non è stato possibile completare l'operazione</div> : null }
            </div>
        </div>
        </center>
    )
}