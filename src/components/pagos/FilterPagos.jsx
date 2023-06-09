import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

export default function FilterPagos({ pagos }) {
    const [filters, setFilters] = useState({ fechaInicio: "", fechaFin: "", ordenPago: "" });
    console.log(pagos);
    const filterChanges = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        })
    }
    const filterHandler = () => {
        const { fechaInicio, fechaFin, ordenPago } = filters;
        
        console.log(filters);
    }
    return (
        <Form>
            <ListGroup horizontal>
                <ListGroup.Item className='col-md-5 col-12 d-flex align-items-center'>
                    <p className="m-0 me-2">Orden de pago:</p>
                    <div className="col">
                        <Form.Control type="text" name="ordenPago" onChange={filterChanges} placeholder="Inserte orden de pago" />
                    </div>
                </ListGroup.Item>
                <ListGroup.Item className='col-md-5 col-12 d-flex align-items-center justify-content-around'>
                    <div className="d-flex align-items-center">
                        <p className="m-0 me-2">Desde:</p>
                        <Form.Control type="date" name="fechaInicio" onChange={filterChanges} placeholder="desde" />
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="m-0 mx-2">Hasta:</p>
                        <Form.Control type="date" name="fechaFin" onChange={filterChanges} placeholder="hasta" />
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
