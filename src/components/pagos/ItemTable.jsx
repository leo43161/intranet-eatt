import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';

export default function ItemTable({ setModal, handleShow }) {
    const handleModal = (pago) => {
        handleShow(true)
        setModal(pago);
    }
    return (
        <tr className="align-middle">
            <td className="text-center">
                <Button variant="success" onClick={(pago = {}) => handleModal(pago)}>
                    <FontAwesomeIcon size="1x" icon={faPen} />
                </Button>
            </td>
            <td>1</td>
            <td>745</td>
            <td>130023</td>
            <td>06/12/2022</td>
            <td>30612790813</td>
            <td className='text-nowrap'>COMPAÑIA DE CIRCUITOS CERRADOS</td>
            <td className='text-nowrap'>VILLA JARDIN LOTE 1 - EL CADILLAL</td>
            <td>B</td>
            <td>06-03616</td>
            <td>18/11/2022</td>
            <td>43.560,00</td>
            <td>2.5</td>
            <td>2.178,00</td>
            <td>8.256,60</td>
            <td>4.800,00</td>
            <td>6907</td>
            <td>0,625</td>
            <td>3.000,00</td>
        </tr>
    )
}
