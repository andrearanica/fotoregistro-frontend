import { useState } from 'react'

export default function MyAccount (props) {

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

    const handleUpdateInfo = event => {
        event.preventDefault()
    }

    return (
        <>
        <button type='button' className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#my-account-modal'>Il tuo account</button>

        <div className='modal fade' id='my-account-modal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                <div className='modal-header'>
                    <h1 className='modal-title fs-5' id='exampleModalLabel'>Il tuo account</h1>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div className='modal-body'>
                    <form onSubmit={ handleUpdateInfo }>
                        <label htmlFor='name'>Nome</label>
                        <input id='name' className='form-control my-2 text-center' onChange={ handleChangeName } value={ props.user.name } />
                        <label htmlFor='surname'>Surname</label>
                        <input id='surname' className='form-control my-2 text-center' onChange={ handleChangeSurname } value={ props.user.surname } />
                        <label htmlFor='email'>Email</label>
                        <input id='email' className='form-control my-2 text-center' onChange={ handleChangeEmail } type='email' value={ props.user.email } />
                        <label htmlFor='password'>Password</label>
                        <input id='password' className='form-control my-2 text-center' onChange={ handleChangePassword } type='password' />
                        <label htmlFor='confrim-password'>Conferma password</label>
                        <input id='confirm-password' className='form-control my-2 text-center' onChange={ handleChangeConfirmPassword } type='password' />
                        <input type='submit' className='form-control my-2 btn btn-success' />
                    </form>
                </div>
                <div className='modal-footer'>
                    <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                    <button type='button' className='btn btn-primary'>Save changes</button>
                </div>
                </div>
            </div>
        </div>
        </>
    )

}