import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function index() {
  return (
    <div className="mt-3">
      <header className="container mb-3">
        <div className="card">
          <div className="d-flex justify-content-between align-items-center p-2">
            <div className=""></div>
            <div><h4 className="m-0">Proveedores</h4></div>
            <div className=""
            ><Button variant="primary" onClick={() => handleModal(pago)}>
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
                <th>ID</th>
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
              <tr className="align-middle">
                <td className="text-center">
                  <div className='d-flex'>
                    <Button variant="success" onClick={() => console.log("Editar")}>
                      <FontAwesomeIcon size="1x" icon={faPen} />
                    </Button>
                    <Button className='ms-2' variant="danger" onClick={() => console.log("Editar")}>
                      <FontAwesomeIcon size="1x" icon={faTrash} />
                    </Button>
                  </div>
                </td>
                <td>1</td>
                <td className='text-nowrap'>Ramon Nolasco</td>
                <td>25435157894</td>
                <td className='text-nowrap'>BOULEVARD 9 DE JULIO 435</td>
                <td>YERBA BUENA</td>
                <td>Tucumán</td>
                <td>4107</td>
                <td>tucumanturismo@gmail.com</td>
                <td>3816495164</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </div>
  )
}
