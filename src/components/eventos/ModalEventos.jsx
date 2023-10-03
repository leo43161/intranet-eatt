import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from "react";
import Consultas from "../../helpers/consultasHelpers";
import Swal from 'sweetalert2';
import dynamic from 'next/dynamic';

export default function ModalEventos({ show, handleClose, setProvReload, addProv }) {
  const MapWithNoSSR = dynamic(() => import("../Map"), {
    ssr: false
  });
  const { editarProveedor, crearProv, verificarProv, crearUserProv } = Consultas;
  const [evento, setEvento] = useState({
    titulo: "",
    copete: "",
    cuerpo: "",
    fechainicio: "",
    fechafin: "",
    fechacreacion: "",
    estado: "",
    ubicacion: [-26.8311352, -65.2044729]
  })
  const { Cuit, Domicilio, NombreP, Telefono, cp, email, localidad, provincia, password } = evento;
  const [editProv, setEditProv] = useState({});

  const [error, setError] = useState({ error: false, msg: "" });
  useEffect(() => {
    if (!addProv) { setEditProv(evento) } else {
      setEditProv({
        Cuit: null,
        NombreP: "",
        Domicilio: "",
        localidad: "",
        provincia: "",
        cp: null,
        Telefono: "",
        email: "",
        borrado: 0,
        activo: 1,
        password: ""
      })
    };
  }, [evento, show]);

  const handleChange = (e) => {
    setEditProv({
      ...editProv,
      [e.target.name]: e.target.value,
    });
  };
  const ubicationHandler = (location) => {
    setEditProv({
      ...editProv,
      ["ubicacion"]: location,
    });
  }

  const handlerSubmit = async () => {
    const provUpdate = !addProv ? { ...evento, ...editProv } : editProv;
    let _errorAlert = false;
    let _errorsKeys = "";
    /* COMPRUEBA SI EL USUARIO EXISTE EN LA DB */
    const checkProv = await verificarProv(provUpdate.Cuit);

    for (const key in provUpdate) {
      if (key === "NombreP" || key === "password" || key === "Cuit") {
        if (!editProv[key] || editProv[key].toString().trim() === "") { _errorsKeys += " " + key, _errorAlert = true; }
      }
    }

    if (_errorAlert) {
      setError({ error: true, msg: "Los valores requeridos no pueden estar vacios:" + _errorsKeys });
      return;
    };

    if (checkProv && addProv) { return setError({ error: true, msg: "El proveedor ya existe" }) };
    setError({ error: false, msg: "" });

    /* SWAL ALERT EJECUTA LAS CONSULTAS */
    Swal.fire({
      icon: 'warning',
      title: 'Estas seguro que quiere subir el proveedor con los campos cargados?',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      Swal.showLoading();
      if (result.isConfirmed) {
        if (addProv) {
          await crearProv(provUpdate)
          await crearUserProv(provUpdate)
        } else { await editarProveedor(provUpdate) };
        setProvReload(true);
        Swal.hideLoading();
        Swal.fire(addProv ? 'Pago creado!' : "Pago editado!", '', 'success');
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
        <Modal.Body>
          <div className='p-3'>
            <Form className=''>
              <div className='d-flex justify-content-between align-items-center gap-4 mb-3'>
                <div className="col">
                  <div>
                    <Form.Check
                      type={"checkbox"}
                      id={`default-checkbox`}
                      label={`Destacar evento`}
                    />
                  </div>
                </div>
                <div className="col">
                  <div>
                    <Form.Check
                      type={"checkbox"}
                      id={`default-checkbox`}
                      label={`Visible`}
                    />
                  </div>
                </div>
                <div className="col">
                  <Form.Select className="col" controlId="razonSocial">
                    <option>Seleccione una categoria</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div>
              </div>
              <div>
                <h5 className="mb-0">Lugar</h5>
                <hr />
              </div>
              <div className='d-flex justify-content-between gap-4 mb-3'>
                <div className='col'>
                  <Form.Group className="mb-2" controlId="email">
                    <Form.Label>Localidad</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name="email" defaultValue={email} placeholder="ej: ejemplo@correo.com" />
                  </Form.Group>
                </div>
                <div className='col'>
                  <Form.Group className="mb-2" controlId="telefono">
                    <Form.Label>Direccion</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name="Telefono" defaultValue={Telefono} placeholder="ej: 3816162181" />
                  </Form.Group>
                </div>
              </div>
              <div>
                <h5 className="mb-0">Horario</h5>
                <hr />
              </div>
              <div className='d-flex justify-content-between gap-4'>
                <div className='col-5'>
                  <Form.Group className="mb-2 d-flex justify-content-between align-items-center" controlId="email">
                    <Form.Label className='col'>Inicio</Form.Label>
                    <div className='col'>
                      <Form.Control type="time" onChange={handleChange} name="email" defaultValue={email} placeholder="ej: ejemplo@correo.com" />
                    </div>
                  </Form.Group>
                </div>
                <div className='col-5'>
                  <Form.Group className="mb-2 d-flex justify-content-between align-items-center" controlId="email">
                    <Form.Label className='col'>Fin</Form.Label>
                    <div className='col'>
                      <Form.Control type="time" onChange={handleChange} name="email" defaultValue={email} placeholder="ej: ejemplo@correo.com" />
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div>
                <h5 className="mb-0">Fecha</h5>
                <hr />
              </div>
              <div className='d-flex justify-content-between gap-4'>
                <div className='col-5'>
                  <Form.Group className="mb-2 d-flex justify-content-between align-items-center" controlId="email">
                    <Form.Label className='col'>Inicio</Form.Label>
                    <div className='col'>
                      <Form.Control type="date" onChange={handleChange} name="email" defaultValue={email} placeholder="ej: ejemplo@correo.com" />
                    </div>
                  </Form.Group>
                </div>
                <div className='col-5'>
                  <Form.Group className="mb-2 d-flex justify-content-between align-items-center" controlId="email">
                    <Form.Label className='col'>Fin</Form.Label>
                    <div className='col'>
                      <Form.Control type="date" onChange={handleChange} name="email" defaultValue={email} placeholder="ej: ejemplo@correo.com" />
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className='d-flex justify-content-between'>
                <Form.Group className="mb-2 col" controlId="localidad">
                  <Form.Label className='fw-bold h5'>Titulo *</Form.Label>
                  <Form.Control type="text" size='lg' onChange={handleChange} name="localidad" defaultValue={localidad} placeholder="ej: San Miguel de tucuman" />
                </Form.Group>
              </div>
              <div className='d-flex justify-content-between'>
                <Form.Group className="mb-2 col" controlId="localidad">
                  <Form.Label className='fw-bold h5'>Ubicacion *</Form.Label>
                  <div style={{ height: "40vh" }}>
                    <MapWithNoSSR position={evento.ubicacion}></MapWithNoSSR>
                  </div>
                </Form.Group>
              </div>
            </Form>
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
          <Button variant="success" onClick={handlerSubmit}>
            {addProv ? "Añadir" : "Editar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
