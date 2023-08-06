import { Link } from 'react-router-dom'

export default function Home () {
    return (
        <div className='container my-4 text-center'>
            <h1>📚 Fotoregistro</h1>
            <p>Raccogli le foto dei tuoi studenti in modo immediato</p>
            <hr />
            <h2>A chi serve?</h2>
            <div className='row'>
                <div className='col-sm-6 mb-3 mb-sm-0 my-4'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>🏫 Insegnanti</h5>
                            <p className='card-text'>Non dovrai più chiedere ai tuoi studenti di inviarti i loro selfie: <i>fotoregistro</i> li raccoglierà automaticamente e ti consentirà di stampare il tuo fotoregistro</p>
                        </div>
                    </div>
                </div>
                <div className='col-sm-6 my-4'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>🧑🏻‍🎓 Studenti</h5>
                            <p className='card-text'>Non dovrai fare nulla di difficile... scattati una foto e inviala al professore attraverso <i>fotoregistro</i>: al resto ci pensiamo noi</p>
                        </div>
                    </div>
                </div>
                <center><Link to='/login'><button className='btn btn-primary my-4' style={{ width: '500px' }}>Unisciti a <i>fotoregistro</i></button></Link></center>
            </div>
        </div>
    )
}