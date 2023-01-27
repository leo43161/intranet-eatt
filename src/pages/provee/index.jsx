import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TableExport from 'table-export';
import Comprobante from '../../components/proveedores/Comprobante';
import { useState } from 'react';


export default function Pagos() {
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState({});
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const excelHandler = () => {
        TableExport('table-excel', 'test', 'xls');
    }
    return (
        <div>
            <div className="container">
                <div className="my-3">
                    <Form>
                        <ListGroup horizontal>
                            
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
                                <th>CUIT</th>
                                <th>RAZON SOCIAL</th>
                                <th>DOMICILIO</th>
                                <th>FACTURA</th>
                                <th>FECHA</th>
                                <th>MONTO</th>
                                <th>SARET</th>
                                <th>Imprimir</th>
                                <th>Gan</th>
                                <th>Imprimir</th>
                                <th>SS</th>
                                <th>Imprimir</th>
                                <th>TEM</th>
                                <th>Imprimir</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Comprobante setModal={setModal} handleShow={handleShow}></Comprobante>
                            <Comprobante setModal={setModal} handleShow={handleShow}></Comprobante>
                            <Comprobante setModal={setModal} handleShow={handleShow}></Comprobante>
                        </tbody>
                    </Table>
                </div>
            </div>
           
        </div>
    )
}
