import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { convertirFechaInput } from '../../helpers/listaHelpers';
import { useState, useEffect } from "react";
import { editarPago } from "../../helpers/listaHelpers"
import Swal from 'sweetalert2';

export default function PagosModal({ show, handleClose, pago, setPagosReload }) {
    const { Id, Libramiento, codop, FechaPago, fechaFactura, Cuit, NombreP, Domicilio, TipoFactura, Factura, MontoBase, saretP, SARET, Gan, SS, temP, TEM } = pago;
    const [editPagos, setEditPagos] = useState({});
    const [error, setError] = useState({ error: false, msg: "" });
    useEffect(() => {
        if (pago && show) setEditPagos({
            Libramiento,
            FechaPago: FechaPago && convertirFechaInput(FechaPago),
            TipoFactura,
            fechaFactura: fechaFactura && convertirFechaInput(fechaFactura),
            saretP,
            temP
        })
    }, [pago, show]);

    const handleChange = (e) => {
        setEditPagos({
            ...editPagos,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = () => {
        const pagoUpdate = { ...pago, ...editPagos };
        let _errorAlert = false;
        for (const key in editPagos) {
            if (editPagos[key].toString().trim() === "") {
                setError({ error: true, msg: "Todos los campos tienen que llenarse" });
                _errorAlert = true;
            };
            if (key === "Libramiento" || key === "saretP" || key === "temP") {
                if (parseFloat(editPagos[key]) > 2147483647) {
                    _errorAlert = true;
                    setError({ error: true, msg: "Los valores no deben ser mayores a 2147483647" });
                }
            }
        }
        if (_errorAlert) return;
        setError({ error: false, msg: "" });
        Swal.fire({
            icon: 'warning',
            title: 'Estas seguro que quiere descartar las ordenes de pago seleccionadas?',
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            Swal.showLoading();
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                await editarPago(pagoUpdate);
                setPagosReload(true);
                Swal.hideLoading();
                Swal.fire('Pago editado!', '', 'success');
                handleClose();
            } else if (result.isDenied) {
                Swal.hideLoading();
                setPagosReload(true);
                Swal.fire('Ocurrio un error', 'Intentelo de nuevo en unos minutos', 'error')
            }
        });
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>
                            <span className='fw-bold'>N°: </span><span>{Id}</span>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="d-flex justify-content-around align-items-center mb-4">
                            <div className="d-flex align-items-center flex-column">
                                <span className='fw-bold me-2'>Libramiento: </span>
                                <span>
                                    <Form.Control
                                        name="Libramiento"
                                        size="sm"
                                        type="text"
                                        placeholder="Libramiento"
                                        defaultValue={Libramiento}
                                        onChange={handleChange}
                                    />
                                </span>
                            </div>
                            <div className="d-flex align-items-center flex-column">
                                <span className='fw-bold'>Numero de Pago: </span><span>{codop}</span>
                            </div>
                            <div className="d-flex align-items-center flex-column">
                                <span className='fw-bold me-2'>Fecha de pago: </span>
                                <span>
                                    <Form.Control
                                        name="FechaPago"
                                        size="sm"
                                        type="date"
                                        defaultValue={FechaPago && convertirFechaInput(FechaPago)}
                                        onChange={handleChange}
                                    >
                                    </Form.Control>
                                </span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around align-items-center mb-4">
                            <div className='d-flex flex-column align-items-center'>
                                <h6 className='fw-bold'>Cuit: </h6><span>{Cuit}</span>
                            </div>
                            <div className='d-flex flex-column align-items-center'>
                                <h6 className='fw-bold'>Razon social: </h6><span>{NombreP}</span>
                            </div>
                            <div className='d-flex flex-column align-items-center'>
                                <h6 className='fw-bold'>Domicilio: </h6><span>{Domicilio}</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around align-items-center mb-4">
                            <div className='d-flex flex-column align-items-center'>
                                <h6 className='fw-bold'>Tipo: </h6>
                                <span>
                                    <Form.Select
                                        name="TipoFactura"
                                        aria-label="Default select example"
                                        size="sm"
                                        defaultValue={TipoFactura}
                                        onChange={handleChange}
                                    >
                                        <option>Tipo</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="O">O</option>
                                    </Form.Select>
                                </span>
                            </div>
                            <div className='d-flex flex-column align-items-center'>
                                <h6 className='fw-bold'>Factura: </h6>
                                {/* <span><Form.Control size="sm" type="text" placeholder="Factura" defaultValue={Factura} /></span> */}
                                <span>{Factura}</span>
                            </div>
                            <div className='d-flex flex-column align-items-center'>
                                <h6 className='fw-bold'>Fecha Facturas: </h6>
                                <span>
                                    <Form.Control
                                        name="fechaFactura"
                                        size="sm"
                                        type="date"
                                        defaultValue={fechaFactura && convertirFechaInput(fechaFactura)}
                                        onChange={handleChange}
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around align-items-center mb-4">
                            <div className='d-flex flex-column align-items-center col-3'>
                                <div className='d-flex align-items-center mb-2 col-6'>
                                    <h6 className='fw-bold mb-0 me-2'>SARET: </h6>
                                    <Form.Control
                                        name="saretP"
                                        size="sm"
                                        type="text"
                                        defaultValue={saretP}
                                        placeholder="%"
                                        onChange={handleChange}
                                        disabled={!SARET}
                                    />
                                </div>
                                <span>${SARET}</span>
                            </div>
                            <div className='d-flex flex-column align-items-center col-3'>
                                <h6 className='fw-bold'>Gan: </h6>
                                <span>${Gan}</span>
                            </div>
                            <div className='d-flex flex-column align-items-center col-3'>
                                <h6 className='fw-bold'>SS: </h6>
                                <span>${SS}</span>
                            </div>
                            <div className='d-flex flex-column align-items-center col-3'>
                                <div className='d-flex align-items-center mb-2 col-6'>
                                    <h6 className='fw-bold mb-0 me-2'>TEM: </h6>
                                    <Form.Control
                                        name="temP"
                                        size="sm"
                                        type="text"
                                        placeholder="%"
                                        defaultValue={temP}
                                        onChange={handleChange}
                                        disabled={!TEM}
                                    />
                                </div>
                                <span>${TEM}</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around align-items-center mb-4">
                            <div className='d-flex flex-column align-items-center'>
                                <h6 className='fw-bold'>MONTO BASE: </h6><span>${MontoBase}</span>
                            </div>
                            <div className='d-flex flex-column align-items-center'>
                                <h6 className='fw-bold'>RETENCIONES: </h6><span>${SARET + Gan + SS + TEM}</span>
                            </div>
                        </div>
                        {error.error ? (
                            <Alert variant="warning">
                                {error.msg}
                            </Alert>
                        ) : null}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Editar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
