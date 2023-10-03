import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faPrint, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import Consultas from "../../helpers/consultasHelpers";
const GeneratePDF = dynamic(() => import("../../components/GeneratePDF"), { ssr: false });

export default function ItemTable({ setPagoModal, handleShow, pago, setPagosReload }) {
    const { Id, Libramiento, codop, FechaPago, fechaFactura, Cuit, NombreP, Domicilio, TipoFactura, Factura, MontoBase, saretP, SARET, Gan, SS, temId, temP, TEM } = pago;
    const montoRet = SARET + Gan + SS + TEM;
    const handleModal = (pago) => {
        handleShow(true)
        setPagoModal(pago);
    }
    const { desactivarOrdenPago } = Consultas;
    const handleDelete = () => {
        Swal.fire({
            icon: 'warning',
            title: `Estas seguro que quiere eliminar el pago N°: ${codop} ?`,
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            Swal.showLoading();
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                await desactivarOrdenPago(pago);
                setPagosReload(true);
                Swal.hideLoading();
                Swal.fire('Pago editado!', '', 'success');
            } else if (result.isDenied) {
                Swal.hideLoading();
                setPagosReload(true);
                Swal.fire('Ocurrio un error', 'Intentelo de nuevo en unos minutos', 'error')
            }
        });
    }

    return (<>
        <tr className="align-middle">
            <td className="text-center d-flex gap-2">
                <Button variant="success" onClick={() => handleModal(pago)}>
                    <FontAwesomeIcon size="1x" icon={faPen} />
                </Button>
                <Button variant="danger" onClick={() => handleDelete()}>
                    <FontAwesomeIcon size="1x" icon={faTrash} />
                </Button>
            </td>
            <td>{Id}</td>
            <td>{Libramiento}</td>
            <td>{codop}</td>
            <td>{FechaPago}</td>
            <td>{Cuit}</td>
            <td className='text-nowrap'>{NombreP}</td>
            <td className='text-nowrap'>{Domicilio}</td>
            <td>{TipoFactura}</td>
            <td>{Factura}</td>
            <td>{fechaFactura}</td>
            <td>${MontoBase}</td>
            <td>${MontoBase + montoRet}</td>
            <td>{saretP}</td>
            <td>
                <div className="d-flex justify-content-between align-items-center">
                    <span>${SARET}</span>
                    {SARET ? <GeneratePDF pago={pago} ret="SARET">
                        <Button className="ms-2" size="sm" variant="success">
                            <FontAwesomeIcon size="1x" icon={faPrint} />
                        </Button>
                    </GeneratePDF> : null}
                </div>
            </td>
            <td>
                <div className="d-flex justify-content-between align-items-center">
                    <span>${Gan}</span>
                    {/* Gan ? <GeneratePDF pago={pago} ret="Gan">
                        <Button className="ms-2" size="sm" variant="success">
                            <FontAwesomeIcon size="1x" icon={faPrint} />
                        </Button>
                    </GeneratePDF> : null */}
                </div>
            </td>
            <td>
                <div className="d-flex justify-content-between align-items-center">
                    <span>${SS}</span>
                    {/* SS ? <GeneratePDF pago={pago} ret="SS">
                        <Button className="ms-2" size="sm" variant="success">
                            <FontAwesomeIcon size="1x" icon={faPrint} />
                        </Button>
                    </GeneratePDF> : null */}
                </div>
            </td>
            <td>{temId}</td>
            <td>{temP}</td>
            <td>
                <div className="d-flex justify-content-between align-items-center">
                    <span>${TEM}</span>
                    {TEM ? <GeneratePDF pago={pago} ret="TEM">
                        <Button className="ms-2" size="sm" variant="success">
                            <FontAwesomeIcon size="1x" icon={faPrint} />
                        </Button>
                    </GeneratePDF> : null}
                </div>
            </td>
            <td>${montoRet}</td>
        </tr>
    </>
    )
}
