import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TableExport from 'table-export';
import ItemTable from '../../components/pagos/ItemTable';
import { useState } from 'react';

export default function Pagos() {
    const [edit, setEdit] = useState(null);
    const excelHandler = () => {
        TableExport('table-excel', 'test', 'doc');
    }
    return (
        <div>
            <div className="container">
                <div className="my-3">
                    <Form>
                        <ListGroup horizontal>
                            <ListGroup.Item className='col-md-5 col-lg-4 col-12 d-flex align-items-center'>
                                <p className="m-0 me-2">Orden de pago:</p>
                                <div className="col">
                                    <Form.Control type="email" placeholder="Inserte orden de pago" />
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item className='col-md-4 col-lg-5 col-12 d-flex align-items-center justify-content-around'>
                                <div className="d-flex align-items-center">
                                    <p className="m-0 me-2">Desde:</p>
                                    <Form.Control type="date" placeholder="desde" />
                                </div>
                                <div className="d-flex align-items-center">
                                    <p className="m-0 mx-2">Hasta:</p>
                                    <Form.Control type="date" placeholder="hasta" />
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item className='col-md-3 col-lg-3 col-12 d-flex align-items-center justify-content-around'>
                                <Button variant="success" onClick={excelHandler} >
                                    <span className="">Descargar Excel</span>
                                </Button>
                                <Button variant="primary">
                                    <span className="">Filtrar</span>
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Form>
                </div>
                <div className="table-responsive">
                    <Table striped bordered hover id='table-excel'>
                        <thead>
                            <tr>
                                <th>Editar</th>
                                <th>N°</th>
                                <th>LIB</th>
                                <th>OP</th>
                                <th>F. PAGO</th>
                                <th>CUIT</th>
                                <th>RAZON SOCIAL</th>
                                <th>DOMICILIO</th>
                                <th>TIPO</th>
                                <th>FACTURA</th>
                                <th>FECHA</th>
                                <th>MONTO</th>
                                <th>%</th>
                                <th>SARET</th>
                                <th>Gan</th>
                                <th>SS</th>
                                <th>ID</th>
                                <th>%</th>
                                <th>TEM</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ItemTable  setEdit={setEdit} edit={edit}></ItemTable>
                            <ItemTable  setEdit={setEdit} edit={edit}></ItemTable>
                            <ItemTable  setEdit={setEdit} edit={edit}></ItemTable>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
