import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function PagosModal({ show, handleClose }) {
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>
                            <span className='fw-bold'>N°: </span><span>1</span>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="d-flex justify-content-around align-items-center mb-4">
                            <div className="d-flex align-items-center flex-column">
                                <span className='fw-bold me-2'>Libramiento: </span>
                                <span><Form.Control size="sm" type="text" placeholder="Libramiento" value={745} /></span>
                            </div>
                            <div className="d-flex align-items-center flex-column">
                                <span className='fw-bold'>Numero de Pago: </span><span>130023</span>
                            </div>
                            <div className="d-flex align-items-center flex-column">
                                <span className='fw-bold me-2'>Fecha de pago: </span>
                                <span><Form.Control size="sm" type="date"></Form.Control></span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around align-items-center mb-4">
                            <div className='d-flex flex-column align-items-center'>
                                <h6 className='fw-bold'>Cuit: </h6><span>30612790813</span>
                            </div>
                            <div className='d-flex flex-column align-items-center'>
                                <h6 className='fw-bold'>Razon social: </h6><span>COMPAÑIA DE CIRCUITOS CERRADOS</span>
                            </div>
                            <div className='d-flex flex-column align-items-center'>
                                <h6 className='fw-bold'>Domicilio: </h6><span>SAN LORENZO 496 - SMT</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around align-items-center mb-4">
                            <div className='d-flex flex-column align-items-center'>
                                <h6 className='fw-bold'>Tipo: </h6>
                                <span>
                                    <Form.Select aria-label="Default select example" size="sm">
                                        <option>Tipo</option>
                                        <option value="1">A</option>
                                        <option value="2">B</option>
                                        <option value="3">C</option>
                                    </Form.Select>
                                </span>
                            </div>
                            <div className='d-flex flex-column align-items-center'>
                                <h6 className='fw-bold'>Factura: </h6>
                                <span><Form.Control size="sm" type="text" placeholder="Factura" value={"06-03616"} /></span>
                            </div>
                            <div className='d-flex flex-column align-items-center'>
                                <h6 className='fw-bold'>Fecha: </h6>
                                <span><Form.Control size="sm" type="date" value="06/12/2022" /></span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around align-items-center mb-4">
                            <div className='d-flex flex-column align-items-center col-3'>
                                <div className='d-flex align-items-center mb-2 col-6'>
                                    <h6 className='fw-bold mb-0 me-2'>SARET: </h6>
                                    <Form.Control size="sm" type="text" placeholder="%" />
                                </div>
                                <span>$2178,00</span>
                            </div>
                            <div className='d-flex flex-column align-items-center col-3'>
                                <h6 className='fw-bold'>Gan: </h6>
                                <span>$2178,00</span>
                            </div>
                            <div className='d-flex flex-column align-items-center col-3'>
                                <h6 className='fw-bold'>SS: </h6>
                                <span>$435,60</span>
                            </div>
                            <div className='d-flex flex-column align-items-center col-3'>
                                <div className='d-flex align-items-center mb-2 col-6'>
                                    <h6 className='fw-bold mb-0 me-2'>TEM: </h6>
                                    <Form.Control size="sm" type="text" placeholder="%" />
                                </div>
                                <span>$2178,00</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around align-items-center mb-4">
                            <div className='d-flex flex-column align-items-center'>
                                <h6 className='fw-bold'>MONTO: </h6><span>$480.000,00</span>
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
