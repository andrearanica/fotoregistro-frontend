import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Navbar () {

    const [user, setUser] = useState({})

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:8000/api/auth-info',
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => {
            setUser(res.data)
        })
        .catch(err => console.error(err))
    }, [''])

    return (
        <nav className='navbar navbar-expand-lg bg-body-tertiary'>
            <div className='container-fluid'>
                <a className='navbar-brand' href='/'>Fotoregistro</a>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                    <li className='nav-item'>
                        <a className='nav-link active' aria-current='page' href='/'>Home</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link active' aria-current='page' href='/login'>Login</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href='/signup'>Registrati</a>
                    </li>
                    { console.log(user) }
                    { user !== {} ? <li className='nav-item'>
                        <a className='nav-link' href='my-account'>
                        { user.photo ? 
                            <img style={{ width: 25, borderRadius: '5px' }} src={ `http://localhost:8000/images/${ user.photo }` } alt='User' /> : null }
                        </a>    
                    </li> : null }
                </ul>
                </div>
            </div>
        </nav>
    )

}