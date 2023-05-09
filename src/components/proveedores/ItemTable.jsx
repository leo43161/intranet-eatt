import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ItemTable({ handleShow, prov, setProvModal }) {
    const { Cuit, Domicilio, NombreP, Telefono, cp, email, localidad, provincia } = prov;
    const handleModal = (prov) => {
        handleShow(true)
        setProvModal(prov);
    }
    return (
        <>
            <tr className="align-middle">
                <td className="text-center">
                    <div className='d-flex justify-content-around'>
                        <Button variant="success" onClick={() => handleModal(prov)}>
                            <FontAwesomeIcon size="1x" icon={faPen} />
                        </Button>
                        <Button className='ms-2' variant="danger" onClick={() => console.log("Editar")}>
                            <FontAwesomeIcon size="1x" icon={faTrash} />
                        </Button>
                    </div>
                </td>
                <td className='text-nowrap'>{NombreP}</td>
                <td>{Cuit}</td>
                <td className='text-nowrap'>{Domicilio}</td>
                <td>{localidad}</td>
                <td>{provincia}</td>
                <td>{cp}</td>
                <td>{email}</td>
                <td>{Telefono}</td>
            </tr>
        </>
    )
}
