import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import OrdenDePago from './OrdenDePago';
import { subirPagos } from '../../helpers/pagosHelpers';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function ModalPagos({ show, handleClose, pagosFitered, pagos }) {
    const [pagosDeleted, setPagosDeleted] = useState({});
    useEffect(() => {
        if (pagosFitered) {
            let _pagosDeleted = {};
            pagosFitered.forEach(pagos => {
                _pagosDeleted[pagos[0]._pago.nOrden] = pagos[0].index;
            });
            setPagosDeleted(_pagosDeleted);
        }
    }, [pagosFitered]);
    const handleChange = (e) => {
        setPagosDeleted({
            ...pagosDeleted,
            [e.target.name]: parseInt(e.target.id),
        });
    }
    const handleSubmit = () => {
        let _pagos = pagos;
        for (const key in pagosDeleted) {
            const element = pagosDeleted[key];
            _pagos = _pagos.filter(({ }, index) => index !== element);
        }

        Swal.fire({
            icon: 'warning',
            title: 'Estas seguro que quiere descartar las ordenes de pago seleccionadas?',
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            console.log(_pagos);
            Swal.showLoading();
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                await subirPagos(_pagos);
                Swal.hideLoading();
                /* Swal.fire('Pagos guardados!', '', 'success'); */
                Swal.fire('Pagos guardados!', '', 'success');
            } else if (result.isDenied) {
                Swal.hideLoading()
                Swal.fire('Ocurrio un error', 'Intentelo de nuevo en unos minutos', 'error')
            }
        });
    }
    return (
        <>
            <Modal show={show} size="xl" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Selecciona los pagos a descartar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {pagosFitered.map((pagos, idx) => {
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
                    <Button variant="primary" onClick={handleSubmit}>
                        Descartar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
