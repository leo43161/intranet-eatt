import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
export default function CardEventos() {
    const [checkbox, toggleButton] = useState(true)
    return (
        <div>
            <div className="d-flex flex-row p-0 overflow-hidden col border rounded">
                <div className="col-8 p-3">
                    <h4>Titulo</h4>
                </div>
                <div className="col-4">
                    <img src="https://www.tucumanturismo.gob.ar/carga/image/fotofest.jpeg" className="img-fluid" alt="" />
                </div>
            </div>
            <div>
                <div class="btn-group w-100" role="group" aria-label="Basic example">
                    <ToggleButton
                        id="toggle-check"
                        type="checkbox"
                        variant="outline-secondary"
                        checked={checkbox}
                        value="1"
                        onChange={() => toggleButton(!checkbox)}
                    >
                        <FontAwesomeIcon icon={faEye} />
                    </ToggleButton>
                    <Button variant="success">
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button variant="danger">
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
