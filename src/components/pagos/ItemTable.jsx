import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faPrint } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
const GeneratePDF = dynamic(() => import("../../components/GeneratePDF"), { ssr: false });

export default function ItemTable({ setPagoModal, handleShow, pago }) {
    const { Id, Libramiento, codop, FechaPago, fechaFactura, Cuit, NombreP, Domicilio, TipoFactura, Factura, MontoBase, saretP, SARET, Gan, SS, temId, temP, TEM } = pago;
    const handleModal = (pago) => {
        handleShow(true)
        setPagoModal(pago);
    }

    return (<>
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
            <td>
                <div className="d-flex justify-content-between align-items-center">
                    <span>${SARET}</span>
                    {SARET ? <GeneratePDF ret="SARET">
                        <Button className="ms-2" size="sm" variant="success">
                            <FontAwesomeIcon size="1x" icon={faPrint} />
                        </Button>
                    </GeneratePDF> : null}
                </div>
            </td>
            <td>
                <div className="d-flex justify-content-between align-items-center">
                    <span>${Gan}</span>
                    {Gan ? <GeneratePDF ret="Gan">
                        <Button className="ms-2" size="sm" variant="success">
                            <FontAwesomeIcon size="1x" icon={faPrint} />
                        </Button>
                    </GeneratePDF> : null}
                </div>
            </td>
            <td>
                <div className="d-flex justify-content-between align-items-center">
                    <span>${SS}</span>
                    {SS ? <GeneratePDF ret="SS">
                        <Button className="ms-2" size="sm" variant="success">
                            <FontAwesomeIcon size="1x" icon={faPrint} />
                        </Button>
                    </GeneratePDF> : null}
                </div>
            </td>
            <td>{temId}</td>
            <td>{temP}</td>
            <td>
                <div className="d-flex justify-content-between align-items-center">
                    <span>${TEM}</span>
                    {TEM ? <GeneratePDF ret="TEM">
                        <Button className="ms-2" size="sm" variant="success">
                            <FontAwesomeIcon size="1x" icon={faPrint} />
                        </Button>
                    </GeneratePDF> : null}
                </div>
            </td>
            <td>${SARET + Gan + SS + TEM}</td>
        </tr>
    </>
    )
}
