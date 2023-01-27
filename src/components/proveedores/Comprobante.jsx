import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';

export default function ItemTable({ setModal, handleShow }) {
    const handleModal = (pago) => {
        handleShow(true)
        
    }
    return (
        <tr className="align-middle">
            
            <td>30612790813</td>
            <td className='text-nowrap'>COMPAÑIA DE CIRCUITOS CERRADOS</td>
            <td className='text-nowrap'>VILLA JARDIN LOTE 1 - EL CADILLAL</td>
             <td>06-03616</td>
            <td>18/11/2022</td>
            <td>43.560,00</td>
            <td>2.178,00</td>
            <td className="text-center">
                <Button variant="success" onClick={(pago = {}) => handleModal(pago)}>
                    <FontAwesomeIcon size="1x" icon={faPrint} />
                </Button>
            </td>
            <td>8.256,60</td>
            <td className="text-center">
                <Button variant="success" onClick={(pago = {}) => handleModal(pago)}>
                    <FontAwesomeIcon size="1x" icon={faPrint} />
                </Button>
            </td>
            <td>4.800,00</td>
            <td className="text-center">
                <Button variant="success" onClick={(pago = {}) => handleModal(pago)}>
                    <FontAwesomeIcon size="1x" icon={faPrint} />
                </Button>
            </td>
               
            <td>3.000,00</td>
            <td className="text-center">
                <Button variant="success" onClick={(pago = {}) => handleModal(pago)}>
                    <FontAwesomeIcon size="1x" icon={faPrint} />
                </Button>
            </td>
        </tr>
    )
}
