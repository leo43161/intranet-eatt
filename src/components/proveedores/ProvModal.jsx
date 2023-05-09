import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";

export default function ProvModal({ show, handleClose, proveedor, setProvReload }) {
  const [editPagos, setEditPagos] = useState({});
  const [error, setError] = useState({ error: false, msg: "" });
  console.log(proveedor);
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <div>
              <span className='fw-bold'>Editar Proovedor - Cuit: 23165969189</span>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <div className='d-flex justify-content-between'>
                <Form.Group className="mb-3 col pe-3" controlId="formBasicEmail">
                  <Form.Label>Razon Social</Form.Label>
                  <Form.Control type="text" placeholder="" />
                </Form.Group>
                <Form.Group className="mb-3 col" controlId="formBasicEmail">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="text" placeholder="" />
                </Form.Group>
              </div>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Domicilio</Form.Label>
                <Form.Control type="text" placeholder="" />
              </Form.Group>
              <div className='d-flex justify-content-between'>
                <div className='col pe-3'>
                  <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="" />
                  </Form.Group>
                </div>
                <div className='col'>
                  <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control type="text" placeholder="" />
                  </Form.Group>
                </div>
              </div>
              <div className='d-flex justify-content-between'>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Localidad</Form.Label>
                  <Form.Control type="text" placeholder="" />
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Label>Provincia</Form.Label>
                  <Form.Control type="text" placeholder="" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Label>Codigo Postal</Form.Label>
                  <Form.Control type="text" placeholder="" />
                </Form.Group>
              </div>


            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={"handleClose"}>
            Cerrar
          </Button>
          <Button variant="success" onClick={"handleSubmit"}>
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
