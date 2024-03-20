import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Swal from 'sweetalert2';
import dynamic from 'next/dynamic';
import Consultas from "../../helpers/consultasHelpers";
import DropZoneImage from '../DropZoneImage';
import { convertirFechaInput, convertirFechaIso } from "../../helpers/cargaHelpers";

export default function ModalEventos({ show, handleClose, setEventReload, addEvent, evento }) {
  const MapWithNoSSR = dynamic(() => import("../Map"), {
    ssr: false
  });

  const {
    editarEvento,
    crearEvento,
    listarLocalidades,
    listarCategEvento,
    listarSubCategEvento,
    uploadImage
  } = Consultas;

  const [formData, setFormData] = useState({
    id: 1,
    nombre: "",
    fechaInicio: "",
    fechaFin: "",
    horaInicio: "",
    horaFin: "",
    descripcion: "",
    imagen: null,
    visible: 1,
    destacado: 0,
    idSubcat: 1,
    idCategoria: 1,
    direccion: "",
    idLocalidad: 1,
    latitud: -26.8311503,
    longitud: -65.2044409
  });

  const [ubiView, setUbiView] = useState(true);
  const [imagen, setImagen] = useState(null);
  const [coordenadas, setCoordenadas] = useState([-26.8311503, -65.2044409]);
  const [localidades, setLocalidades] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [subCategorias, setSubCategorias] = useState([]);
  const [error, setError] = useState({ isError: false, message: "" });

  useEffect(() => {
    const fetchData = async () => {
      if (show) {
        const _localidades = await listarLocalidades();
        const _categorias = await listarCategEvento();
        setLocalidades(_localidades);
        setCategorias(_categorias);
      }
    };
    fetchData();
  }, [show]);

  useEffect(() => {
    const fetchSubCategEvento = async () => {
      if (categorias.length > 0) {
        const _subCategorias = await listarSubCategEvento(formData.idCategoria);
        setSubCategorias(_subCategorias);
      }
    };
    fetchSubCategEvento();
  }, [categorias, formData.idCategoria]);

  useEffect(() => {
    setError({ isError: false, message: "" });
    if (addEvent) {
      setFormData({
        id: 1,
        nombre: "",
        fechaInicio: "",
        fechaFin: "",
        horaInicio: "",
        horaFin: "",
        descripcion: "",
        imagen: null,
        visible: 1,
        destacado: 0,
        idSubcat: null,
        idCategoria: 1,
        direccion: "",
        idLocalidad: 1,
        latitud: -26.8311503,
        longitud: -65.2044409
      });
    } else {
      setCoordenadas([evento.latitud, evento.longitud]);
      setFormData({
        ...evento,
        idLocalidad: evento.idLocalidad?.toString(),
        visible: evento.visible === 1,
        destacado: evento.destacado === 1,
        fechaInicio: convertirFechaInput(convertirFechaIso(evento.fechaInicio)),
        fechaFin: convertirFechaInput(convertirFechaIso(evento.fechaFin)),
      });
    }
  }, [addEvent, evento]);

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

    const eventoData = {
      ...restFormData,
      idLocalidad: parseInt(idLocalidad),
      visible: formData.visible ? 1 : 0,
      destacado: formData.destacado ? 1 : 0,
      idSubcat: subCategorias.length > 0 ? parseInt(formData.idSubcat) : null,
      imagen: imagen ? imagen : formData.imagen,
      latitud: ubiView ? coordenadas[0] : null,
      longitud: ubiView ? coordenadas[1] : null,
    };
    const requiredFields = ["nombre", "fechaInicio", "idCategoria", "idLocalidad", "imagen"];
    const missingFields = requiredFields.filter(field => !eventoData[field] || eventoData[field].toString().trim() === "");

    if (missingFields.length > 0) {
      setError({ isError: true, message: `Los siguientes campos son obligatorios: ${missingFields.join(", ")}` });
      return;
    };
    if (imagen?.size > 500000) {
      setError({ isError: true, message: 'La imagen no tiene que pesar mas de 400kb.' });
      return;
    };

    try {
      const actionMessage = addEvent ? 'crear' : 'editar';
      const result = await Swal.fire({
        icon: 'warning',
        title: `¿Estás seguro de que deseas ${actionMessage} el evento con los datos proporcionados?`,
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar'
      });
      if (result.isConfirmed) {
        if (typeof eventoData.imagen === "object") {
          try {
            const resultImage = await uploadImage(imagen);
            if (resultImage.status !== 200) {
              setError({ isError: true, message: 'Se produjo un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.' });
              return;
            }
            eventoData.imagen = imagen.name;
          } catch (error) {
            // Maneja los errores aquí si es necesario
            console.error('Error:', error);
            setError({ isError: true, message: 'Se produjo un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.' });
            return;
          }
        }
        Swal.showLoading();
        if (addEvent) {
          await crearEvento(eventoData);
        } else {
          await editarEvento(eventoData);
        }
        setEventReload(true);
        Swal.fire(`${addEvent ? 'Evento creado' : 'Evento editado'} correctamente`, '', 'success');
        handleClose();
      } else {
        setEventReload(true);
        Swal.fire('Operación cancelada', '', 'info');
      }
    } catch (error) {
      console.error('Error:', error);
      setError({ isError: true, message: 'Se produjo un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.' });
    } finally {
      setImagen(null);
      Swal.hideLoading();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body>
          <div className='p-3'>
            <Form className=''>
              <div className='d-flex justify-content-between align-items-center gap-4 mb-3'>
                <div className="col-2">
                  <div>
                    <Form.Check
                      type={"checkbox"}
                      id={`Destacado-checkbox`}
                      label={`Destacar`}
                      name='destacado'
                      checked={formData.destacado}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-2">
                  <div>
                    <Form.Check
                      type={"checkbox"}
                      id={`Visible-checkbox`}
                      label={`Visible`}
                      name='visible'
                      checked={formData.visible}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col d-flex flex-md-row flex-column gap-3">
                  <Form.Select className="col" value={formData.idCategoria || ""} name="idCategoria" onChange={handleChange} controlid="idCategoria">
                    {categorias.length > 0 ?
                      <option value={0}>Seleccione una Categorias</option>
                      :
                      <option value={0}>Cargando...</option>}
                    {categorias.map(({ nombre, id }) => (
                      <option value={id} key={id}>{nombre.trim()}</option>
                    ))}
                  </Form.Select>
                  {subCategorias.length > 0 &&
                    <Form.Select className="col" value={formData.idSubcat || ""} name="idSubcat" onChange={handleChange} controlid="idSubcat">
                      <option value={0}>Seleccione una Subcategoria</option>
                      {subCategorias.map(({ nombre, id }) => (
                        <option value={id} key={id}>{nombre?.trim()}</option>
                      ))}
                    </Form.Select>
                  }
                </div>
              </div>
              <div>
                <h5 className="mb-0">Lugar</h5>
                <hr />
              </div>
              <div className='d-flex justify-content-between gap-4 mb-3'>
                <div className='col'>
                  <Form.Group className="mb-2" controlid="Localidad">
                    <Form.Label>Localidad</Form.Label>
                    <Form.Select className="col" value={formData.idLocalidad || ""} onChange={handleChange} name='idLocalidad' controlid="Localidad">
                      <option value={""}>Seleccione una Localidad</option>
                      {localidades.map(({ nombre, id }) => (
                        <option value={id} key={id}>{nombre.trim()}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className='col'>
                  <Form.Group className="mb-2" controlid="direccion">
                    <Form.Label>Direccion</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name="direccion" defaultValue={formData.direccion} placeholder="ej: 3816162181" />
                  </Form.Group>
                </div>
              </div>
              <div>
                <h5 className="mb-0">Horario</h5>
                <hr />
              </div>
              <div className='d-flex justify-content-between gap-4'>
                <div className='col-5'>
                  <Form.Group className="mb-2 d-flex justify-content-between align-items-center" controlid="horaInicio">
                    <Form.Label className='col'>Inicio</Form.Label>
                    <div className='col'>
                      <Form.Control type="time" onChange={handleChange} name="horaInicio" defaultValue={formData.horaInicio} placeholder="ej: ejemplo@correo.com" />
                    </div>
                  </Form.Group>
                </div>
                <div className='col-5'>
                  <Form.Group className="mb-2 d-flex justify-content-between align-items-center" controlid="horaFin">
                    <Form.Label className='col'>Fin</Form.Label>
                    <div className='col'>
                      <Form.Control type="time" onChange={handleChange} name="horaFin" defaultValue={formData.horaFin} placeholder="ej: ejemplo@correo.com" />
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
                  <Form.Group className="mb-2 d-flex justify-content-between align-items-center" controlid="fechaInicio">
                    <Form.Label className='col'>Inicio</Form.Label>
                    <div className='col'>
                      <Form.Control type="date" onChange={handleChange} name="fechaInicio" defaultValue={formData.fechaInicio} placeholder="ej: ejemplo@correo.com" />
                    </div>
                  </Form.Group>
                </div>
                <div className='col-5'>
                  <Form.Group className="mb-2 d-flex justify-content-between align-items-center" controlid="fechaFin">
                    <Form.Label className='col'>Fin</Form.Label>
                    <div className='col'>
                      <Form.Control type="date" onChange={handleChange} name="fechaFin" defaultValue={formData.fechaFin} placeholder="ej: ejemplo@correo.com" />
                    </div>
                  </Form.Group>
                </div>
              </div>

              <div className='mb-2'>
                <Form.Group className="mb-2 col" controlid="nombre">
                  <Form.Label className='fw-bold h5'>Titulo *</Form.Label>
                  <Form.Control type="text" size='lg' onChange={handleChange} name="nombre" defaultValue={formData.nombre} placeholder="ej: San Miguel de tucuman" />
                </Form.Group>
                <Form.Group className="mb-2 col" controlid="descripcion">
                  <Form.Label className='fw-bold h5'>Descripcion</Form.Label>
                  <Form.Control onChange={handleChange} as="textarea" defaultValue={formData.descripcion} name='descripcion' rows={4} />
                </Form.Group>
              </div>

              <div className='mb-3'>
                <h5>Imagen</h5>
                <DropZoneImage setState={setImagen} path={"http://10.15.15.151/touchvanilla/public/img/eventos-img/"} imagen={formData.imagen}></DropZoneImage>
              </div>

              <div className='d-flex justify-content-between'>
                <Form.Group className="mb-2 col">
                  <div className='d-flex gap-2'>
                    <Form.Label className='fw-bold h5'>Ubicacion</Form.Label>
                    <Form.Check
                      type={'checkbox'}
                      id={`default-check`}
                      onClick={() => setUbiView(!ubiView)}
                    />
                  </div>
                  {ubiView && <div style={{ height: "40vh" }}>
                    <MapWithNoSSR position={coordenadas} setState={setCoordenadas}></MapWithNoSSR>
                  </div>}
                </Form.Group>
              </div>
            </Form>
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
            {addEvent ? "Añadir" : "Editar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
