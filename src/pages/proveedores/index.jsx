import Consultas from '../../helpers/consultasHelpers';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';
import ProvModal from '../../components/proveedores/ProvModal';
import ItemTable from '../../components/proveedores/ItemTable';

export default function index() {
  const { listarProv } = Consultas;
  const [show, setShow] = useState(false);
  const [provModal, setProvModal] = useState({});
  const [addProv, setAddProv] = useState(false);

  const [proveedores, setProveedores] = useState([]);
  const [provReload, setProvReload] = useState(true);

  const handleShow = () => {
    setShow(true);
    setAddProv(false);
    setProvModal({});
  };
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (provReload) {
      consultarProv();
      setProvReload(false);
    }
  }, [provReload]);

  const consultarProv = async () => {
    try {
      const _proveedores = await listarProv();
      setProveedores(_proveedores);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="mt-3">
        <header className="container mb-3">
          <div className="card">
            <div className="d-flex justify-content-between align-items-center p-2">
              <div className=""></div>
              <div><h4 className="m-0">Proveedores</h4></div>
              <div className="">
                <Button variant="primary" onClick={() => { handleShow(), setAddProv(true) }}>
                  <FontAwesomeIcon size="1x" icon={faPlus} />
                </Button>
              </div>
            </div>
          </div>
        </header>
        <section className='container'>
          <div className="table-responsive">
            <Table striped bordered hover id='table-excel'>
              <thead>
                <tr>
                  <th>Opciones</th>
                  <th>RAZON SOCIAL</th>
                  <th>CUIT</th>
                  <th>DOMICILIO</th>
                  <th>Localidad</th>
                  <th>Provincia</th>
                  <th>C.P</th>
                  <th>Email</th>
                  <th>Telefono</th>
                </tr>
              </thead>
              <tbody>
                {proveedores.map((proveedor, index) => (
                  <ItemTable key={index} handleShow={handleShow} prov={proveedor} setProvModal={setProvModal}></ItemTable>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      </div>
      {provModal && <ProvModal show={show} handleClose={handleClose} proveedor={provModal} setProvReload={setProvReload} addProv={addProv}></ProvModal>}
    </>
  )
}
