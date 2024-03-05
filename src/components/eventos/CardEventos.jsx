import { faEdit, faTrash, faEye, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
export default function CardEventos({ evento, handleOpenEdit }) {
    const [checkbox, toggleButton] = useState(true)
    const { descripcion, imagen, nombre, fechaInicio, fechaFin } = evento;
    function convertirFechaIso(fechaISO) {
        const fecha = new Date(fechaISO);

        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear();

        return `${dia}/${mes}/${anio}`;
    }
    return (
        <div className="border d-flex flex-column" style={{ height: "540px" }}>
            <div className="d-flex flex-row p-0 overflow-hidden col rounded flex-grow-1 border">
                <div className="col p-3 d-flex flex-column gap-3">
                    <div className="col d-flex justify-content-center flex-column overflow-hidden flex-fill">
                        <img src={"https://www.institucionalturismotuc.gob.ar/public/img/" + imagen} className="img-fluid" alt="" />
                    </div>
                    <div>
                        <h4 className="text-clamp-2">{nombre}</h4>
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        {convertirFechaIso(fechaInicio)} {fechaFin && `- ${convertirFechaIso(fechaFin)}`}
                    </div>
                    <div className="col">
                        <p className="text-clamp-4">{descripcion}</p>
                    </div>
                </div>

            </div>
            <div>
                <div className="btn-group w-100" role="group" aria-label="Basic example">
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
                    <Button variant="success" onClick={() => handleOpenEdit(evento)}>
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
