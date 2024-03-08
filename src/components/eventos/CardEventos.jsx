import { faEdit, faTrash, faEye, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import Consultas from "../../helpers/consultasHelpers";
import { convertirFechaIso } from "../../helpers/cargaHelpers";
export default function CardEventos({ evento, handleOpenEdit, setEventReload, setLoader }) {
    const { id, descripcion, imagen, nombre, fechaInicio, fechaFin, visible } = evento;
    const { statesEvento } = Consultas;
    const stateHandler = async (state) => {
        try {
            const actionMessage = state === "visible" ? 'desactivar la visibilidad de el evento' : 'eliminar el evento';
            const result = await Swal.fire({
                icon: 'warning',
                title: `¿Estás seguro de que deseas ${actionMessage}?`,
                showCancelButton: true,
                confirmButtonText: 'Continuar',
                cancelButtonText: 'Cancelar'
            });
            if (result.isConfirmed) {
                Swal.showLoading();
                setLoader(true);
                await statesEvento(evento, state);
                setEventReload(true);
                Swal.fire(`${state === "visible" ? 'Visibilidad desactivada correctamente' : 'Evento eliminado'} correctamente`, '', 'success');
            } else {
                setEventReload(true);
                Swal.fire('Operación cancelada', '', 'info');
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: "error",
                title: "Ocurrio un error",
                text: "No se pudo ejecutar ejecutar el cambio, intentelo de nuevo en unos minutos",
            });
        } finally {
            Swal.hideLoading();
            setLoader(false);
        }
    }
    return (
        <div className="d-flex flex-column" style={{ height: "540px" }}>
            <div className="d-flex flex-row p-0 overflow-hidden col rounded-top flex-grow-1 border">
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
                        id={"visible-check-" + id}
                        type="checkbox"
                        variant="outline-secondary"
                        checked={visible === 1}
                        value="1"
                        onChange={() => stateHandler("visible")}
                        style={{ borderTopLeftRadius: "0" }}
                    >
                        <FontAwesomeIcon icon={faEye} />
                    </ToggleButton>
                    <Button variant="success" onClick={() => handleOpenEdit(evento)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button 
                    variant="danger" 
                    onClick={() => stateHandler("activa")}
                    style={{ borderTopRightRadius: "0" }}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
