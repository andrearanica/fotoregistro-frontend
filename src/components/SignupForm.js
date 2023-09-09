import axios from 'axios'
import { useState } from 'react'

export default function SignupForm () {
    
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleChangeName = event => {
        setName(event.target.value)
    }

    const handleChangeSurname = event => {
        setSurname(event.target.value)
    }

    const handleChangeEmail = event => {
        setEmail(event.target.value)
    }

    const handleChangePassword = event => {
        setPassword(event.target.value)
    }

    const handleChangeConfirmPassword = event => {
        setConfirmPassword(event.target.value)
    }

    const handleFormSubmit = event => {
        event.preventDefault()
        axios({
            method: 'POST',
            url: 'http://192.168.1.95:8000/api/register',
            data: {
                email: email,
                password: password,
                confirm_password: confirmPassword,
                name: name,
                surname: surname
            }
        })
        .then(res => {
            window.localStorage.setItem('token', res.data.token)
            window.location.href = '/dashboard'
        })
        .catch(res => console.log(res))
    }
    
    return (
        <div>
            <form onSubmit={ handleFormSubmit } className='my-4'>
                <label htmlFor='name'>Nome</label>
                <input id='name' className='form-control my-2 text-center' onChange={ handleChangeName } />
                <label htmlFor='surname'>Surname</label>
                <input id='surname' className='form-control my-2 text-center' onChange={ handleChangeSurname } />
                <label htmlFor='email'>Email</label>
                <input id='email' className='form-control my-2 text-center' onChange={ handleChangeEmail } type='email' />
                <label htmlFor='password'>Password</label>
                <input id='password' className='form-control my-2 text-center' onChange={ handleChangePassword } type='password' />
                <label htmlFor='confrim-password'>Conferma password</label>
                <input id='confirm-password' className='form-control my-2 text-center' onChange={ handleChangeConfirmPassword } type='password' />
                <input type='submit' className='form-control my-2 btn btn-success' />
            </form> 
        </div>
    )

}