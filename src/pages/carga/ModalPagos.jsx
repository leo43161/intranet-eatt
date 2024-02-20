import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import OrdenDePago from './OrdenDePago';
import { subirPagos } from '../../helpers/cargaHelpers';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function ModalPagos({ show, handleClose, pagosFitered, pagos, pagosHandler }) {
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
        console.log(pagosDeleted);
    }

    const handleSubmit = () => {
        let pagosSelected = [];
        let _pagosFiltered = pagos;
        for (const key in pagosDeleted) {
            const element = pagosDeleted[key];
            const numeroOrden = key.toString();
            _pagosFiltered = _pagosFiltered.filter(({ nOrden }) => nOrden !== key);
            pagosSelected.push(pagos.find(({ nOrden }, index) => index === element && nOrden === numeroOrden));
        }
        const pagosUpdated = [ ...pagosSelected, ..._pagosFiltered];

        Swal.fire({
            icon: 'warning',
            title: 'Estas seguro que quiere descartar las ordenes de pago seleccionadas?',
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            console.log(pagosUpdated);
            Swal.showLoading();
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Cargando pagos',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    onBeforeOpen: () => {
                        Swal.showLoading();
                    },
                });
                await subirPagos(pagosUpdated);
                // Simula una carga de 30 segundos
                setTimeout(async () => {
                    // Cierra el Swal loading
                    Swal.close();
                    Swal.fire({
                        icon: 'success',
                        title: 'Se han guardado correctamente los pagos',
                    });
                }, 30000);
                pagosHandler(true);
                handleClose();
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
                    <Modal.Title>Selecciona el pago correspondiente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {pagosFitered ? pagosFitered.map((pagos, idx) => {
                        return (
                            <Alert variant={"danger"} key={idx}>
                                <h4 className="mb-3">Orden de pago: {pagos[0]._pago.nOrden}</h4>
                                {pagos.map((pago, idx) => (<div key={idx}>
                                    <OrdenDePago idx={idx} pago={pago} handleChange={handleChange}></OrdenDePago>
                                </div>))}
                            </Alert>
                        )
                    }) : null}
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
