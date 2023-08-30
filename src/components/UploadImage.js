import axios from 'axios'
import { useState } from 'react'

export default function UploadImage (props) {

    const [image, setImage] = useState('')
    const [result, setResult] = useState(0)

    const handleSendImage = event => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('image', image)
        axios({
            method: 'POST',
            url: `http://localhost:8000/api/users/${ props.user.id }/photo`, 
            data: formData,
            headers: {
                'Authorization': `Bearer ${ window.localStorage.getItem('token') }`
            }
        }).then(res => {
            setResult(2)
            console.log(res)
        })
        .catch(err => {
            setResult(1)
            console.error(err)
        })
    }

    const handleChangeImage = event => {
        setImage(event.target.files[0])
    }

    return (
        <form className='my-4 text-center' onSubmit={ handleSendImage }>
            <input type='file' onChange={ handleChangeImage } className='form-control my-2' />
            <input type='submit' className='btn btn-primary' />
            { result === 2 ? <div className='alert alert-success my-4 p-4'>Immagine caricata</div> :
              result === 1 ? <div className='alert alert-warning my-4 p-4'>Impossibile caricare</div> : null }
        </form>
    )

}