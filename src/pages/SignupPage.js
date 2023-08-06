import { Link } from 'react-router-dom'
import SignupForm from '../components/SignupForm'

export default function SignupPage () {
    return (
        <div className='container my-4 text-center'>
            <h1>Signup</h1>
            <SignupForm />
            <p>Sei già registrato? Clicca <Link to='/login'>qua</Link></p>
        </div>
    )
}