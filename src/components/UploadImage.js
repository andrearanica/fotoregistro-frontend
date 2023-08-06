export default function UploadImage () {

    const handleChangeFile = event => {
        event.preventDefault()
        
    }

    return (
        <input type='file' onChange={ handleChangeFile } />
    )

}