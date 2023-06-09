import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TableExport from 'table-export';
import ItemTable from '../../components/pagos/ItemTable';
import { useEffect, useState } from 'react';
import PagosModal from '../../components/pagos/PagosModal';
import { listPagos, listCuentas } from '../../helpers/listaHelpers';
import FilterPagos from '../../components/pagos/FilterPagos';

export default function Pagos() {
    const [show, setShow] = useState(false);

    const [pagoModal, setPagoModal] = useState({});

    const [pagos, setPagos] = useState([]);
    const [pagosReload, setPagosReload] = useState(true);

    const [cuentas, setCuentas] = useState([]);
    const [cuenta, setCuenta] = useState();

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const excelHandler = () => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}_${currentDate.getHours()}-${currentDate.getMinutes()}`;
        TableExport('table-excel', 'Ordenes ' + formattedDate, 'xls');
    }

    useEffect(() => {
        if (pagosReload) {
            consultarCuentas();
            if (cuenta) consultarPagos(cuenta);
            setPagosReload(false);
        }
    }, [pagosReload]);

    const consultarPagos = async (cuenta) => {
        try {
            const _pagos = await listPagos(cuenta);
            setPagos(_pagos);
        } catch (error) {
            console.log(error);
        }
    }

    const consultarCuentas = async () => {
        try {
            const _cuentas = await listCuentas();
            setCuentas(_cuentas);
            if (!cuenta) {
                setCuenta(_cuentas[0].IdCuentaEmisora);
                setPagosReload(true);
            };
        } catch (error) {
            console.log(error);
        }
    }

    const handlerCuenta = (e) => {
        const valueSelect = e.target.value;
        setCuenta(valueSelect);
        setPagosReload(true);
    }

    return (
        <div>
            <div className="container">
                <div className="my-3">
                    <div className="card">
                        <div className="d-flex align-items-center justify-content-between px-3 py-2">
                            <div className="d-flex align-items-center justify-content-between col-9">
                                <div className="me-2 col h5 m-0">Cueta Emisora:</div>
                                <div className="col-9">
                                    <Form.Select
                                        name="TipoFactura"
                                        onChange={handlerCuenta}
                                        defaultValue={cuenta}
                                    >
                                        {cuentas.map(({ IdCuentaEmisora, NombreC }, index) => (
                                            <option key={index} value={IdCuentaEmisora} >{IdCuentaEmisora} - {NombreC}</option>
                                        ))}
                                    </Form.Select>
                                </div>
                            </div>
                            <div className="col d-flex justify-content-around ps-4">
                                <Button className="col-10" variant="success" onClick={excelHandler} >
                                    <span className="">Descargar Excel</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-3">
                    <FilterPagos pagos={pagos}></FilterPagos>
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
                                <th>FECHA FACTURA</th>
                                <th>MONTO</th>
                                <th>%</th>
                                <th>SARET</th>
                                <th>Gan</th>
                                <th>SS</th>
                                <th>ID</th>
                                <th>%</th>
                                <th>TEM</th>
                                <th>MONTO RETENCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagos.map(pago => (<ItemTable key={pago.Id} setPagoModal={setPagoModal} handleShow={handleShow} pago={pago}></ItemTable>))}
                        </tbody>
                    </Table>
                </div>
            </div>
            {pagoModal && <PagosModal show={show} handleClose={handleClose} pago={pagoModal} setPagosReload={setPagosReload}></PagosModal>}
        </div>
    )
}
