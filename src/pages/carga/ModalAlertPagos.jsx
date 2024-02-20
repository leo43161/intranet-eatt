import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import OrdenDePago from './OrdenDePago';
import { subirPagos } from '../../helpers/cargaHelpers';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function ModalAlertPagos({ pagosError, handleClose }) {
    const handleSubmit = () => {

    }
    return (
        <>
            <Modal show={show} size="xl" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Selecciona el pago correspondiente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Descartar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
