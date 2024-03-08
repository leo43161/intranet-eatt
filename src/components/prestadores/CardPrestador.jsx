import { faEdit, faTrash, faEye, faMapMarkerAlt, faPhone, faEnvelope, faGlobe, faPersonHiking } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faSquareInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Swal from 'sweetalert2';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import Consultas from "../../helpers/consultasHelpers";
export default function CardPrestador({
    handleOpen,
    prestador,
    setPrestador,
    setPrestReload,
    setLoader
}) {
    const {
        id,
        titulo,
        responsable,
        direccion,
        localidad,
        telefono,
        email,
        web,
        facebook,
        instagram,
        actividades,
        visible
    } = prestador;
    const { editarPrestador } = Consultas;
    const handleState = async (state, value) => {
        const _prestador = { ...prestador, [state]: value }
        try {
            const result = await Swal.fire({
                icon: 'warning',
                title: `¿Estás seguro de que deseas cambiar el estado: ${state} de el prestador?`,
                showCancelButton: true,
                confirmButtonText: 'Continuar',
                cancelButtonText: 'Cancelar'
            });
            
            if (result.isConfirmed) {
                setLoader(true);
                Swal.showLoading();
                await editarPrestador(_prestador);
                setPrestReload(true);
                Swal.fire(`Estado cambiado correctamente`, '', 'success');
                setLoader(false);
            } else {
                setPrestReload(true);
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
            <div className="d-flex flex-row p-0 overflow-hidden col border rounded">
                <div className="col p-3">
                    <div>
                        <h4>{titulo}</h4>
                    </div>
                    <div>
                        <p>{responsable}</p>
                    </div>
                    <div className="d-flex flex-column gap-3 w-100">
                        <div className="d-flex align-items-center gap-1">
                            <FontAwesomeIcon size="lg" icon={faMapMarkerAlt} />
                            <h6 className="mb-0">{direccion ? `${direccion} -` : null} {localidad}</h6>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                            <FontAwesomeIcon size="lg" icon={faPhone} />
                            <h6 className="mb-0">{telefono}</h6>
                        </div>
                        {email && (
                            <div className="d-flex align-items-center gap-1">
                                <FontAwesomeIcon size="lg" icon={faEnvelope} />
                                <h6 className="mb-0">{email}</h6>
                            </div>
                        )}
                        {web && (
                            <div className="d-flex align-items-center gap-1">
                                <FontAwesomeIcon size="lg" icon={faGlobe} />
                                <h6 className="mb-0">{web}</h6>
                            </div>
                        )}
                        <div className="d-flex justify-content-evenly">
                            {facebook &&
                                <div className="d-flex align-items-center gap-1">
                                    <FontAwesomeIcon size="lg" icon={faFacebook} />
                                    <a href={facebook} className="mb-0">Ver perfil</a>
                                </div>
                            }
                            {instagram &&
                                <div className="d-flex align-items-center gap-1">
                                    <FontAwesomeIcon size="lg" icon={faSquareInstagram} />
                                    <a href={instagram} className="mb-0">Ver perfil</a>
                                </div>
                            }
                        </div>
                        <div className="col overflow-hidden">
                            <div className="d-flex gap-1 flex-wrap">
                                {actividades.split(",").map((actividad, idx) => (
                                    <div key={idx} className="d-flex align-items-center gap-1">
                                        <FontAwesomeIcon size="lg" icon={faPersonHiking} />
                                        <h6 className="mb-0">{actividad}</h6>
                                    </div>
                                ))}
                            </div>
                        </div>
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
                        setPrestador(prestador);
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
