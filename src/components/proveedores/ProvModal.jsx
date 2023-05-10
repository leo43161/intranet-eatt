import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";

export default function ProvModal({ show, handleClose, proveedor, setProvReload }) {
  const { Cuit, Domicilio, NombreP, Telefono, cp, email, localidad, provincia } = proveedor;
  const [editPagos, setEditPagos] = useState({});
  const [error, setError] = useState({ error: false, msg: "" });
  console.log(proveedor);
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <div>
              <span className='fw-bold'>Editar Proovedor - Cuit: {Cuit}</span>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <div className='d-flex justify-content-between'>
                <Form.Group className="mb-3 col pe-3" controlId="razonSocial">
                  <Form.Label>Razon Social</Form.Label>
                  <Form.Control type="text" defaultValue={NombreP} placeholder="" />
                </Form.Group>
                <Form.Group className="mb-3 col" controlId="contraseña">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="text" placeholder="" />
                </Form.Group>
              </div>
              <Form.Group className="mb-3" controlId="domicilio">
                <Form.Label>Domicilio</Form.Label>
                <Form.Control type="text" defaultValue={Domicilio} placeholder="" />
              </Form.Group>
              <div className='d-flex justify-content-between'>
                <div className='col pe-3'>
                  <Form.Group className="mb-2" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" defaultValue={email} placeholder="" />
                  </Form.Group>
                </div>
                <div className='col'>
                  <Form.Group className="mb-2" controlId="telefono">
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control type="text" defaultValue={Telefono} placeholder="" />
                  </Form.Group>
                </div>
              </div>
              <div className='d-flex justify-content-between'>
                <Form.Group className="mb-2" controlId="localidad">
                  <Form.Label>Localidad</Form.Label>
                  <Form.Control type="text" defaultValue={localidad} placeholder="" />
                </Form.Group>

                <Form.Group className="mb-2" controlId="provincia">
                  <Form.Label>Provincia</Form.Label>
                  <Form.Control type="text" defaultValue={provincia} placeholder="" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="cp">
                  <Form.Label>Codigo Postal</Form.Label>
                  <Form.Control type="text" defaultValue={cp} placeholder="" />
                </Form.Group>
              </div>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
