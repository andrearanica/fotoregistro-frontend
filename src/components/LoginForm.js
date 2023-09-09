import axios from 'axios'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function LoginForm () {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loginState, setLoginState] = useState(0)     // 1 loading, 2 error, 3 ok

    const handleChangeEmail = event => {
        setEmail(event.target.value)
    }

    const handleChangePassword = event => {
        setPassword(event.target.value)
    }

    const handleFormSubmit = async event => {
        event.preventDefault()
        setLoginState(1)
        axios({
            method: 'POST',
            url: 'http://192.168.1.95:8000/api/login',
            data: {
                email: email,
                password: password
            }
        })
        .then(res => {
            window.localStorage.setItem('token', res.data.token)
            setLoginState(3)
        })
        .catch(res => setLoginState(2))
    }

    return (
        <div className='container my-4'>
            <form onSubmit={ handleFormSubmit } className='my-4'>
                <label htmlFor='email'>Email</label>
                <input id='email' className='form-control my-2 text-center' onChange={ handleChangeEmail } type='email' />
                <label htmlFor='password'>Password </label>
                <input id='password' className='form-control my-2 text-center' onChange={ handleChangePassword } type='password' />
                <input className='form-control my-2 btn btn-success text-center' type='submit' />
            </form>
            {
                loginState === 1 ? <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div> :
                loginState === 2 ? <div className='alert alert-warning my-4'><b>Credenziali errate</b></div> :
                loginState === 3 ? <Navigate to='/dashboard' replace={ true } /> : 
                null
            }
        </div>
    )

}