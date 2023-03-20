import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export default function OrdenDePago({ pago: { _pago, index }, handleChange, idx }) {
    const { fechaP, razonSocial, netoProv, fechafact, nFactura, nOrden } = _pago;

    return (
        <>
            <Card className="mb-2" key={idx}>
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <div><span className="fw-bold">Fecha de pago: </span>{fechaP}</div>
                        <div><span className="fw-bold">Proov: </span>{razonSocial}</div>
                        <div><span className="fw-bold">Neto: </span>{netoProv}</div>
                        <div><span className="fw-bold">Fecha de fact: </span>{fechafact}</div>
                        <div><span className="fw-bold">N° Factura: </span>{nFactura}</div>
                        <div>
                            <Form.Check
                                className="m-0"
                                name={nOrden}
                                type={"radio"}
                                id={`${index}`}
                                onChange={(e) => handleChange(e)}
                                defaultChecked={idx === 0}
                            />
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}
