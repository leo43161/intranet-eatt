import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Pagos() {
    return (
        <div>
            <div className="container">
                <ListGroup>
                    <ListGroup.Item className='col d-flex justify-content-center'>Pagos</ListGroup.Item>
                </ListGroup>
                <div>
                    <Form>
                        <ListGroup horizontal>
                            <ListGroup.Item className='col-md-5 col-lg-4 col-12 d-flex align-items-center'>
                                <p className="m-0 me-2">Orden de pago:</p>
                                <div className="col">
                                    <Form.Control type="email" placeholder="Inserte orden de pago" />
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item className='col-md-4 col-lg-5 col-12 d-flex align-items-center justify-content-around'>
                                <div class="d-flex align-items-center">
                                    <p class="m-0 me-2">Desde:</p>
                                    <Form.Control type="date" placeholder="desde" />
                                </div>
                                <div class="d-flex align-items-center">
                                    <p class="m-0 mx-2">Hasta:</p>
                                    <Form.Control type="date" placeholder="hasta" />
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item className='col-md-3 col-lg-3 col-12 d-flex align-items-center justify-content-around'>
                                <Button variant="success">Success</Button>
                                <Button variant="primary">Primary</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Form>
                </div>
            </div>
        </div>
    )
}
