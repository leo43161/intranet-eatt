import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Swal from 'sweetalert2';
import Consultas from "../../helpers/consultasHelpers";
import ActividadList from './ActividadList';

export default function ModalPrestadores({ show, handleClose, setPrestReload, addPrest, prestador }) {
  const { editarPrestador, crearPrestador, listarLocalidades } = Consultas;

  const [formData, setFormData] = useState({
    titulo: "",
    responsable: "",
    idLocalidad: "",
    direccion: "",
    telefono: "",
    email: "",
    web: "",
    facebook: "",
    instagram: "",
    activo: true,
    visible: true,
  });

  const [actividades, setActividades] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [nuevaActividad, setNuevaActividad] = useState('');
  const [error, setError] = useState({ isError: false, message: "" });

  useEffect(() => {
    const fetchLocalidades = async () => {
      if (show) {
        const _localidades = await listarLocalidades();
        setLocalidades(_localidades);
      }
    };
    fetchLocalidades();
  }, [show]);

  useEffect(() => {
    setError({ isError: false, message: "" });
    if (addPrest) {
      setFormData({
        titulo: "",
        responsable: "",
        idLocalidad: "",
        direccion: "",
        telefono: "",
        email: "",
        web: "",
        facebook: "",
        instagram: "",
        activo: true,
        visible: true,
      });
      setActividades([]);
    } else {
      setFormData({
        ...prestador,
        idLocalidad: prestador.idLocalidad.toString(),
        activo: prestador.activo === 1 ? true : false,
      });
      setActividades(prestador.actividades.split(","));
    }
  }, [addPrest, prestador]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async () => {
    const { idLocalidad, ...restFormData } = formData;
    setError({ isError: false, message: "" });
    const prestadorData = { id: prestador.id, ...restFormData, idLocalidad: parseInt(idLocalidad), actividades: actividades.join(","), activo: formData.activo ? 1 : 0 };
    console.log(prestadorData);
    const requiredFields = ["titulo", "responsable", "telefono", "idLocalidad"];
    const missingFields = requiredFields.filter(field => !prestadorData[field] || prestadorData[field].toString().trim() === "");

    if (missingFields.length > 0) {
      setError({ isError: true, message: `Los siguientes campos son obligatorios: ${missingFields.join(", ")}` });
      return;
    }

    try {
      const actionMessage = addPrest ? 'crear' : 'editar';
      const result = await Swal.fire({
        icon: 'warning',
        title: `¿Estás seguro de que deseas ${actionMessage} el prestador con los datos proporcionados?`,
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar'
      });
      if (result.isConfirmed) {
        Swal.showLoading();
        if (addPrest) {
          await crearPrestador(prestadorData);
        } else {
          await editarPrestador(prestadorData);
        }
        setPrestReload(true);
        Swal.fire(`${addPrest ? 'Prestador creado' : 'Prestador editado'} correctamente`, '', 'success');
        handleClose();
      } else {
        setPrestReload(true);
        Swal.fire('Operación cancelada', '', 'info');
      }
    } catch (error) {
      console.error('Error:', error);
      setError({ isError: true, message: 'Se produjo un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.' });
    } finally {
      Swal.hideLoading();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{addPrest ? "Agrega un prestador" : "Edita el prestador"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='p-3'>
          <Form>
            <div className='d-flex justify-content-between align-items-center gap-4 mb-3'>
              <div className="col">
                <div>
                  <Form.Check
                    type={"checkbox"}
                    id={`default-checkbox`}
                    label={`Visible`}
                    name='visible'
                    checked={formData.visible}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col d-flex gap-2">
                <Form.Select name='idLocalidad' value={formData.idLocalidad || ""} onChange={handleChange} className="col fw-bold">
                  <option value={""}>Seleccione una Localidad</option>
                  {localidades.map(({ nombre, id }) => (
                    <option value={id} key={id}>{nombre}</option>
                  ))}
                </Form.Select>
                <span className='text-danger fw-bold'>*</span>
              </div>
            </div>
            <div>
              <h5 className="mb-0">Titulo <span className='text-danger fw-bold'>*</span></h5>
              <hr />
            </div>
            <div className='d-flex justify-content-between gap-4 mb-3'>
              <div className='col'>
                <Form.Group className="mb-2" controlId="titulo">
                  <Form.Label className="fw-bold">Nombre <span className='text-danger fw-bold'>*</span></Form.Label>
                  <Form.Control type="text" onChange={handleChange} name="titulo" value={formData.titulo || ""} placeholder="ej: KAYAKS DEL NOA" />
                </Form.Group>
              </div>
              <div className='col'>
                <Form.Group className="mb-2" controlId="responsable">
                  <Form.Label className="fw-bold">Responsable <span className='text-danger fw-bold'>*</span></Form.Label>
                  <Form.Control type="text" onChange={handleChange} name="responsable" value={formData.responsable || ""} placeholder="ej: Suarez, Walter Mario" />
                </Form.Group>
              </div>
            </div>
            <div>
              <h5 className="mb-0">Informacion</h5>
              <hr />
            </div>
            <div className='d-flex flex-wrap justify-content-between mb-3'>
              <div className='col-6 px-2 py-1'>
                <Form.Group className="mb-2" controlId="direccion">
                  <Form.Label className="fw-bold">Direccion</Form.Label>
                  <Form.Control type="text" onChange={handleChange} name="direccion" value={formData.direccion || ""} placeholder="ej: Diques: El Cadillal – La Angostura – Escaba" />
                </Form.Group>
              </div>
              <div className='col-6 px-2 py-1'>
                <Form.Group className="mb-2" controlId="telefono">
                  <Form.Label className="fw-bold">Telefono <span className='text-danger fw-bold'>*</span></Form.Label>
                  <Form.Control type="text" onChange={handleChange} name="telefono" value={formData.telefono || ""} placeholder="ej: 3816162181" />
                </Form.Group>
              </div>
              <div className='col-6 px-2 py-1'>
                <Form.Group className="mb-2" controlId="email">
                  <Form.Label className="fw-bold">Email</Form.Label>
                  <Form.Control type="text" onChange={handleChange} name="email" value={formData.email || ""} placeholder="ej: kayaksdelnoa@gmail.com" />
                </Form.Group>
              </div>
              <div className='col-6 px-2 py-1'>
                <Form.Group className="mb-2" controlId="web">
                  <Form.Label className="fw-bold">Web</Form.Label>
                  <Form.Control type="text" onChange={handleChange} name="web" value={formData.web || ""} placeholder="ej: http://www.kayaksdelnoa.com.ar/" />
                </Form.Group>
              </div>
              <div className='col-6 px-2 py-1'>
                <Form.Group className="mb-2" controlId="facebook">
                  <Form.Label className="fw-bold">Facebook</Form.Label>
                  <Form.Control type="text" onChange={handleChange} name="facebook" value={formData.facebook || ""} placeholder="ej: https://wwww.facebook.com/kayaksnoa" />
                </Form.Group>
              </div>
              <div className='col-6 px-2 py-1'>
                <Form.Group className="mb-2" controlId="instagram">
                  <Form.Label className="fw-bold">Instagram</Form.Label>
                  <Form.Control type="text" onChange={handleChange} name="instagram" value={formData.instagram || ""} placeholder="ej: https://www.instagram.com/kayaksdelnoa" />
                </Form.Group>
              </div>
            </div>
            <ActividadList
              actividades={actividades}
              setActividades={setActividades}
              nuevaActividad={nuevaActividad}
              setNuevaActividad={setNuevaActividad}
            />
          </Form>
          <div className='text-danger fw-bold'>
            (*) Estos datos son obligatorios
          </div>
          {error.isError ? (
            <Alert variant="warning">
              {error.message}
            </Alert>
          ) : null}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          {addPrest ? "Añadir" : "Editar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
