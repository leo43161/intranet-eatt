import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Swal from 'sweetalert2';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import Consultas from "../../helpers/consultasHelpers";
export default function CardPrestador({
    setActividad,
    actividad,
    handleOpen,
    setActivReload,
    setLoader,
}) {
    const {
        id,
        nombre,
        imagen,
        visible
    } = actividad;
    const { editarActividad } = Consultas;
    const handleState = async (state, value) => {
        const _prestador = { ...actividad, [state]: value }
        try {
            const result = await Swal.fire({
                icon: 'warning',
                title: `¿Estás seguro de que deseas cambiar el estado: ${state} de el actividad?`,
                showCancelButton: true,
                confirmButtonText: 'Continuar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                setLoader(true);
                Swal.showLoading();
                await editarActividad(_prestador);
                setActivReload(true);
                Swal.fire(`Estado cambiado correctamente`, '', 'success');
                setLoader(false);
            } else {
                setActivReload(true);
                Swal.fire('Operación cancelada', '', 'info');
            }
        } catch (error) {
            console.error('Error:', error);
            setLoader(false);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Se produjo un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.",
            });
        } finally {
            setLoader(false);
            Swal.hideLoading();
        }
    }
    return (
        <div>
            <div className="d-flex flex-row p-0 overflow-hidden col border rounded h-100">
                <div className="d-flex align-items-center">
                    <div className="col-5 p-4">
                        <img className="img-fluid" src={"http://10.15.15.151/touchvanilla/public/icons/activ/" + imagen} style={{filter: "drop-shadow(1px 1px 5px black)"}} alt="" />
                    </div>
                    <div className="col-7 d-flex align-items-center">
                        <h5 className="mb-0">{nombre}</h5>
                    </div>
                </div>
            </div>
            <div>
                <div className="btn-group w-100" role="group" aria-label="Basic example">
                    <ToggleButton
                        id={"visible-" + id}
                        type="checkbox"
                        variant="outline-secondary"
                        checked={visible}
                        value="1"
                        onChange={() => handleState("visible", !visible)}
                    >
                        <FontAwesomeIcon icon={faEye} />
                    </ToggleButton>
                    <Button variant="success" onClick={() => {
                        setActividad(actividad);
                        handleOpen(false);
                    }}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button onClick={() => handleState("activo", false)} variant="danger">
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
