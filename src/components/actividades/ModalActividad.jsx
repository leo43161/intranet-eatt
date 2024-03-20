import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Swal from 'sweetalert2';
import Consultas from "../../helpers/consultasHelpers";
import DropZoneImage from '../DropZoneImage';

export default function ModalPrestadores({
  show,
  setActivReload,
  addActi,
  handleClose,
  actividad,
  setLoader,
}) {
  const { editarActividad, crearActividad, uploadImage } = Consultas;
  const [formData, setFormData] = useState({
    nombre: "",
    imagen: null,
    visible: true,
  });
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState({ isError: false, message: "" });

  useEffect(() => {
    setError({ isError: false, message: "" });
    if (addActi) {
      setFormData({
        nombre: "",
        imagen: null,
        visible: true,
      });
    } else {
      setFormData({
        ...actividad,
      });
    }
  }, [addActi, actividad]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async () => {
    setError({ isError: false, message: "" });
    const actividadData = { ...formData, imagen: imagen ? imagen : formData.imagen };
    const requiredFields = ["nombre"];
    const missingFields = requiredFields.filter(field => !actividadData[field] || actividadData[field].toString().trim() === "");

    if (missingFields.length > 0) {
      setError({ isError: true, message: `Los siguientes campos son obligatorios: ${missingFields.join(", ")}` });
      return;
    }

    try {
      const actionMessage = addActi ? 'crear' : 'editar';
      const result = await Swal.fire({
        icon: 'warning',
        title: `¿Estás seguro de que deseas ${actionMessage} el actividad con los datos proporcionados?`,
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar'
      });
      if (result.isConfirmed) {
        setLoader(true);
        if (typeof actividadData.imagen === "object") {
          try {
            const resultImage = await uploadImage(imagen);
            if (resultImage.status !== 200) {
              setError({ isError: true, message: 'Se produjo un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.' });
              return;
            }
            actividadData.imagen = imagen.name;
          } catch (error) {
            // Maneja los errores aquí si es necesario
            console.error('Error:', error);
            setError({ isError: true, message: 'Se produjo un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.' });
            return;
          }
        }
        Swal.showLoading();
        if (addActi) {
          await crearActividad(actividadData);
        } else {
          await editarActividad(actividadData);
        }
        setActivReload(true);
        Swal.fire(`${addActi ? 'Prestador creado' : 'Prestador editado'} correctamente`, '', 'success');
        handleClose();
        setLoader(false);
      } else {
        setLoader(false);
        setActivReload(true);
        Swal.fire('Operación cancelada', '', 'info');
      }
    } catch (error) {
      setLoader(false);
      console.error('Error:', error);
      setError({ isError: true, message: 'Se produjo un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.' });
    } finally {
      setLoader(false);
      setImagen(null);
      Swal.hideLoading();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{addActi ? "Agrega un actividad" : "Edita el actividad"}</Modal.Title>
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
            </div>
            <div className='d-flex justify-content-between gap-4 mb-3'>
              <div className='col-6'>
                <h5>Imagen</h5>
                <div className='col'>
                  <DropZoneImage path={"http://10.15.15.151/touchvanilla/public/icons/activ/"} setState={setImagen} imagen={formData.imagen}></DropZoneImage>
                </div>
              </div>
              <div className='col'>
                <Form.Group className="mb-2" controlId="nombre">
                  <Form.Label className="fw-bold">Nombre <span className='text-danger fw-bold'>*</span></Form.Label>
                  <Form.Control type="text" onChange={handleChange} name="nombre" value={formData.nombre || ""} placeholder="ej: Trekking" />
                </Form.Group>
              </div>
            </div>
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
          {addActi ? "Añadir" : "Editar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
