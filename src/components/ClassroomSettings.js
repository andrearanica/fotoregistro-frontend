export default function ClassroomSettings (props) {
    
    return (
        <>
        <button type='button' class='btn' data-bs-toggle='modal' data-bs-target='#exampleModal'>
        ⚙️ Impostazioni 
        </button>

        <div class='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
            <div class='modal-dialog'>
                <div class='modal-content'>
                <div class='modal-header'>
                    <h1 class='modal-title fs-5' id='exampleModalLabel'>Impostazioni</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div class='modal-body'>      
                </div>
                </div>
            </div>
        </div>
        </>
    )

}