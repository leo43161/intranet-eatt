import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';

export default function ModalPagos({ show, handleClose }) {
    const _pagoPrueba = [
        [
            {
                "_pago": {
                    "nCuenta": "360000200978981",
                    "nombre": "ENTE AUT. TUC. TURISMO - GASTO Y FUNC.",
                    "nOrden": "6507",
                    "fechaP": "2023-02-08",
                    "codExpEatt": "000251460   22",
                    "cuit": "30708608153",
                    "razonSocial": "MAGAL S.R.L.",
                    "descGastos": "ALARMAS Y MONITOREO VEHICULO Y ESTAB.-EATT-ENERO 2023",
                    "cbuProv": "2850600130094197871021",
                    "netoProv": "13015.00",
                    "fechafact": "2023-02-02",
                    "tipoFact": "B",
                    "factura1": "7",
                    "factura2": "1421",
                    "ctaEmisora1": "7",
                    "ctaEmisora2": "1",
                    "ctaEmisora3": "978981",
                    "libramiento": "02512",
                    "nFactura": "7-1421",
                    "ctaEmisora": "71978981"
                },
                "index": 0
            },
            {
                "_pago": {
                    "nCuenta": "360000200978981",
                    "nombre": "ENTE AUT. TUC. TURISMO - GASTO Y FUNC.",
                    "nOrden": "6507",
                    "fechaP": "2023-02-08",
                    "codExpEatt": "000251460   22",
                    "cuit": "30708608153",
                    "razonSocial": "MAGAL S.R.L.",
                    "descGastos": "ALARMAS Y MONITOREO VEHICULO Y ESTAB.-EATT-ENERO 2023",
                    "cbuProv": "2850600130094197871021",
                    "netoProv": "13015.00",
                    "fechafact": "2023-02-02",
                    "tipoFact": "B",
                    "factura1": "7",
                    "factura2": "1420",
                    "ctaEmisora1": "7",
                    "ctaEmisora2": "1",
                    "ctaEmisora3": "978981",
                    "libramiento": "02512",
                    "nFactura": "7-1420",
                    "ctaEmisora": "71978981"
                },
                "index": 1
            }
        ]
    ]
    return (
        <>
            <Modal show={show} size="xl" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Selecciona los pagos a descartar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant={"danger"}>
                        <h4 className="mb-3">Orden de pago: 3487</h4>
                        <Card className="mb-2">
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <div><span className="fw-bold">Fecha de pago:</span> 2023-02-08</div>
                                    <div><span className="fw-bold">Proov:</span> MAGAL S.R.L.</div>
                                    <div><span className="fw-bold">Neto:</span> 13015.00</div>
                                    <div><span className="fw-bold">Fecha de fact:</span> 2023-02-02</div>
                                    <div><span className="fw-bold">N° Factura:</span> 7-1421</div>
                                    <div>
                                        <Form.Check
                                            className="m-0"
                                            inline
                                            label=""
                                            name="group1"
                                            type={"radio"}
                                            id={`inline-radio-1`}
                                        />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className="mb-2">
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <div><span className="fw-bold">Fecha de pago:</span> 2023-02-08</div>
                                    <div className="col-3 text-truncate"><span className="fw-bold">Proov:</span> ESCUDERO REFRIGERACIONES S.R.L.</div>
                                    <div><span className="fw-bold">Neto:</span> 13015.00</div>
                                    <div><span className="fw-bold">Fecha de fact:</span> 2023-02-02</div>
                                    <div><span className="fw-bold">N° Factura:</span> 7-1421</div>
                                    <div>
                                        <Form.Check
                                            className="m-0"
                                            inline
                                            label=""
                                            name="group1"
                                            type={"radio"}
                                            id={`0`}
                                        />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleClose}>
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
