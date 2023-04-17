import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function PagosModal({ show, handleClose, pago }) {
    const { Id, Libramiento, codop, FechaPago, fechaFactura, Cuit, NombreP, Domicilio, TipoFactura, Factura, MontoBase, saretP, SARET, Gan, SS, temP, TEM } = pago;
    const convertirFecha = (fecha) => {
        const [dia, mes, anio] = fecha.split('/');
        const fechaISO = new Date(anio, mes - 1, dia).toISOString().split('T')[0];
        return fechaISO;
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
                                <span><Form.Control size="sm" type="text" placeholder="Libramiento" defaultValue={Libramiento} /></span>
                            </div>
                            <div className="d-flex align-items-center flex-column">
                                <span className='fw-bold'>Numero de Pago: </span><span>{codop}</span>
                            </div>
                            <div className="d-flex align-items-center flex-column">
                                <span className='fw-bold me-2'>Fecha de pago: </span>
                                <span><Form.Control size="sm" type="date" defaultValue={FechaPago && convertirFecha(FechaPago)}></Form.Control></span>
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
                                    <Form.Select aria-label="Default select example" size="sm" defaultValue={TipoFactura}>
                                        <option>Tipo</option>
                                        <option defaultValue="A">A</option>
                                        <option defaultValue="B">B</option>
                                        <option defaultValue="C">C</option>
                                        <option defaultValue="O">O</option>
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
                                <span><Form.Control size="sm" type="date" defaultValue={fechaFactura && convertirFecha(fechaFactura)} /></span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around align-items-center mb-4">
                            <div className='d-flex flex-column align-items-center col-3'>
                                <div className='d-flex align-items-center mb-2 col-6'>
                                    <h6 className='fw-bold mb-0 me-2'>SARET: </h6>
                                    <Form.Control size="sm" type="text" defaultValue={saretP} placeholder="%" />
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
                                    <Form.Control size="sm" type="text" placeholder="%" defaultValue={temP} />
                                </div>
                                <span>${TEM}</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around align-items-center mb-4">
                            <div className='d-flex flex-column align-items-center'>
                                <h6 className='fw-bold'>MONTO: </h6><span>${MontoBase}</span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="success" onClick={handleClose}>
                        Editar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
