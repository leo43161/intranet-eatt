import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import Consultas from "../../helpers/consultasHelpers";
import Swal from 'sweetalert2';

export default function ProvModal({ show, handleClose, proveedor, setProvReload }) {
  const { editarProveedor } = Consultas;
  const { Cuit, Domicilio, NombreP, Telefono, cp, email, localidad, provincia, password } = proveedor;
  const [editProv, setEditProv] = useState({});
  const [error, setError] = useState({ error: false, msg: "" });
  useEffect(() => {
    if (proveedor && show) setEditProv(proveedor);
  }, [proveedor, show]);

  const handleChange = (e) => {
    setEditProv({
      ...editProv,
      [e.target.name]: e.target.value,
    });
  };

  const handlerSubmit = () => {
    const provUpdate = { ...proveedor, ...editProv };
    let _errorAlert = false;
    for (const key in provUpdate) {
      if (key === "NombreP" || key === "password") {
        if (editProv[key].trim() === "") {
          _errorAlert = true;
          setError({ error: true, msg: "Los valores requeridos no pueden estar vacios" });
        }
      }
    }

    if (_errorAlert) return;
    setError({ error: false, msg: "" });
    console.log(provUpdate);
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
        await editarProveedor(provUpdate);
        console.log("Se edito el pago")
        setProvReload(true);
        Swal.hideLoading();
        Swal.fire('Pago editado!', '', 'success');
        handleClose();
      } else if (result.isDenied) {
        Swal.hideLoading();
        setProvReload(true);
        Swal.fire('Ocurrio un error', 'Intentelo de nuevo en unos minutos', 'error')
      }
    });
  };

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
                  <Form.Control type="text" onChange={handleChange} name="NombreP" defaultValue={NombreP} placeholder="ej: MAGAL S.R.L." />
                </Form.Group>
                <Form.Group className="mb-3 col" controlId="contraseña">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="text" onChange={handleChange} name="password" defaultValue={password} placeholder="*********" />
                </Form.Group>
              </div>
              <Form.Group className="mb-3" controlId="domicilio">
                <Form.Label>Domicilio</Form.Label>
                <Form.Control type="text" onChange={handleChange} name="Domicilio" defaultValue={Domicilio} placeholder="ej: 24 de Septiembre" />
              </Form.Group>
              <div className='d-flex justify-content-between'>
                <div className='col pe-3'>
                  <Form.Group className="mb-2" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name="email" defaultValue={email} placeholder="ej: ejemplo@correo.com" />
                  </Form.Group>
                </div>
                <div className='col'>
                  <Form.Group className="mb-2" controlId="telefono">
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name="Telefono" defaultValue={Telefono} placeholder="ej: 3816162181" />
                  </Form.Group>
                </div>
              </div>
              <div className='d-flex justify-content-between'>
                <Form.Group className="mb-2" controlId="localidad">
                  <Form.Label>Localidad</Form.Label>
                  <Form.Control type="text" onChange={handleChange} name="localidad" defaultValue={localidad} placeholder="ej: San Miguel de tucuman" />
                </Form.Group>

                <Form.Group className="mb-2" controlId="provincia">
                  <Form.Label>Provincia</Form.Label>
                  <Form.Control type="text" onChange={handleChange} name="provincia" defaultValue={provincia} placeholder="ej: Tucuman" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="cp">
                  <Form.Label>Codigo Postal</Form.Label>
                  <Form.Control type="number" onChange={handleChange} name="cp" defaultValue={cp} placeholder="ej: 4000" />
                </Form.Group>
              </div>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="success" onClick={handlerSubmit}>
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
