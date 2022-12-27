import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TableExport from 'table-export';

export default function Pagos() {
    const excelHandler = () => {
        TableExport('table-excel', 'test', 'doc');
    }
    return (
        <div>
            <div className="container">
                <ListGroup>
                    <ListGroup.Item className='col d-flex justify-content-center'>Pagos</ListGroup.Item>
                </ListGroup>
                <div>
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
                            <tr>
                                <td>1</td>
                                <td>745</td>
                                <td>130023</td>
                                <td>06/12/2022</td>
                                <td>30612790813</td>
                                <td className='text-nowrap'>COMPAÑIA DE CIRCUITOS CERRADOS</td>
                                <td className='text-nowrap'>VILLA JARDIN LOTE 1 - EL CADILLAL</td>
                                <td>B</td>
                                <td>06-03616</td>
                                <td>18/11/2022</td>
                                <td>43.560,00</td>
                                <td>2.5</td>
                                <td>2.178,00</td>
                                <td>8.256,60</td>
                                <td>4.800,00</td>
                                <td>6907</td>
                                <td>0,625</td>
                                <td>3.000,00</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>745</td>
                                <td>130023</td>
                                <td>06/12/2022</td>
                                <td>30612790813</td>
                                <td className='text-nowrap'>COMPAÑIA DE CIRCUITOS CERRADOS</td>
                                <td className='text-nowrap'>VILLA JARDIN LOTE 1 - EL CADILLAL</td>
                                <td>B</td>
                                <td>06-03616</td>
                                <td>18/11/2022</td>
                                <td>43.560,00</td>
                                <td>2.5</td>
                                <td>2.178,00</td>
                                <td>8.256,60</td>
                                <td>4.800,00</td>
                                <td>6907</td>
                                <td>0,625</td>
                                <td>3.000,00</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>745</td>
                                <td>130023</td>
                                <td>06/12/2022</td>
                                <td>30612790813</td>
                                <td className='text-nowrap'>COMPAÑIA DE CIRCUITOS CERRADOS</td>
                                <td className='text-nowrap'>VILLA JARDIN LOTE 1 - EL CADILLAL</td>
                                <td>B</td>
                                <td>06-03616</td>
                                <td>18/11/2022</td>
                                <td>43.560,00</td>
                                <td>2.5</td>
                                <td>2.178,00</td>
                                <td>8.256,60</td>
                                <td>4.800,00</td>
                                <td>6907</td>
                                <td>0,625</td>
                                <td>3.000,00</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
