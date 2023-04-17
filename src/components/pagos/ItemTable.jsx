import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';

export default function ItemTable({ setPagoModal, handleShow, pago }) {
    const {Id, Libramiento, codop, FechaPago, fechaFactura, Cuit, NombreP, Domicilio, TipoFactura, Factura, MontoBase, saretP, SARET, Gan, SS, temId, temP, TEM} = pago
    const handleModal = (pago) => {
        handleShow(true)
        setPagoModal(pago);
    }
    return (
        <tr className="align-middle">
            <td className="text-center">
                <Button variant="success" onClick={() => handleModal(pago)}>
                    <FontAwesomeIcon size="1x" icon={faPen} />
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
            <td>{saretP}</td>
            <td>${SARET}</td>
            <td>${Gan}</td>
            <td>${SS}</td>
            <td>{temId}</td>
            <td>{temP}</td>
            <td>${TEM}</td>
        </tr>
    )
}
