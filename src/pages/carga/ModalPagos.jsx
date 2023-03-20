import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import OrdenDePago from './OrdenDePago';
import { useState } from 'react';

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
        ],
        [
            {
                "_pago": {
                    "nCuenta": "360000200978981",
                    "nombre": "ENTE AUT. TUC. TURISMO - GASTO Y FUNC.",
                    "nOrden": "6508",
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
                "index": 3
            },
            {
                "_pago": {
                    "nCuenta": "360000200978981",
                    "nombre": "ENTE AUT. TUC. TURISMO - GASTO Y FUNC.",
                    "nOrden": "6508",
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
                "index": 4
            }
        ]
    ];
    const [pagosDeleted, setPagosDeleted] = useState({});
    const handleChange = (e) => {
        setPagosDeleted({
            ...pagosDeleted,
            [e.target.name]: e.target.id,
        });
        console.log(pagosDeleted);
    }
    return (
        <>
            <Modal show={show} size="xl" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Selecciona los pagos a descartar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {_pagoPrueba.map((pagos, idx) => {
                        return (
                            <Alert variant={"danger"} key={idx}>
                                <h4 className="mb-3">Orden de pago: {pagos[0]._pago.nOrden}</h4>
                                {pagos.map((pago, idx) => (<div key={idx}>
                                    <OrdenDePago idx={idx} pago={pago} handleChange={handleChange}></OrdenDePago>
                                </div>))}
                            </Alert>
                        )
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={() => { console.log(pagosDeleted) }}>
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
