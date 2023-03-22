import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import OrdenDePago from './OrdenDePago';
import { useState } from 'react';

export default function ModalPagos({ show, handleClose, pagos }) {
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
                    {pagos.map((pagos, idx) => {
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
