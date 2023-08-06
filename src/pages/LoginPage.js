import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

export default function LoginPage () {
    return (
        <div className='container text-center my-4'>
            <h1>📰 Fotoregistro</h1>
            <LoginForm />
            <p>Non sei registrato? Clicca <Link to='/signup'>qua</Link></p>
        </div>
    )
}