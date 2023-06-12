import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { listPagos } from '../../helpers/listaHelpers';

export default function FilterPagos({ setPagos, cuenta, setFilters, filters }) {
    const filterChanges = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        })
    }
    const filterHandler = async () => {
        let _pagos = await consultarPagos(cuenta);
        const { fechaInicio, fechaFin, ordenPago } = filters;
        // Rango de fecha de inicio y fecha fin
        const fechaInicioDATE = fechaInicio !== "" ? new Date(fechaInicio) : new Date("1900-01-01");
        const fechaFinDATE = fechaFin !== "" ? new Date(fechaFin) : new Date("9999-12-31");
        if (fechaInicio !== "" || fechaFin !== "") {
            // Filtrar los objetos por fecha dentro del rango
            _pagos = _pagos.filter(pago => {
                const fechaParts = pago.FechaPago.split('/');
                const fecha = new Date(
                    parseInt(fechaParts[2], 10),  // Año
                    parseInt(fechaParts[1], 10) - 1,  // Mes (se resta 1 porque los meses son base 0)
                    parseInt(fechaParts[0], 10)  // Día
                );
                return fecha >= fechaInicioDATE && fecha <= fechaFinDATE;
            });
        }
        if (ordenPago.trim() !== "") {
            _pagos = _pagos.filter(pago => {
                const codOp = pago.codop.toString().toLowerCase();
                const valorInput = ordenPago.toLowerCase();
                return codOp.includes(valorInput);
            });
        }
        setPagos(_pagos);
    }
    const consultarPagos = async (cuenta) => {
        try {
            const _pagos = await listPagos(cuenta);
            return _pagos
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Form>
            <ListGroup horizontal>
                <ListGroup.Item className='col-md-5 col-12 d-flex align-items-center'>
                    <p className="m-0 me-2">Orden de pago:</p>
                    <div className="col">
                        <Form.Control type="number" value={filters.ordenPago} name="ordenPago" onChange={filterChanges} placeholder="Inserte orden de pago" />
                    </div>
                </ListGroup.Item>
                <ListGroup.Item className='col-md-5 col-12 d-flex align-items-center justify-content-around'>
                    <div className="d-flex align-items-center">
                        <p className="m-0 me-2">Desde:</p>
                        <Form.Control type="date" value={filters.fechaInicio} name="fechaInicio" onChange={filterChanges} placeholder="desde" />
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="m-0 mx-2">Hasta:</p>
                        <Form.Control type="date" value={filters.fechaFin} name="fechaFin" onChange={filterChanges} placeholder="hasta" />
                    </div>
                </ListGroup.Item>
                <ListGroup.Item className='col-md-2 col-12 d-flex justify-content-around'>
                    <Button className="w-100" variant="primary" onClick={filterHandler}>
                        <span className="">Filtrar</span>
                    </Button>
                </ListGroup.Item>
            </ListGroup>
        </Form>
    )
}
