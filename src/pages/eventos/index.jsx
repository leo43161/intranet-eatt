import { useState, useEffect } from "react";
import CardEventos from "../../components/eventos/CardEventos";
import ModalEventos from "../../components/eventos/ModalEventos";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Consultas from "../../helpers/consultasHelpers";
import PaginationTouch from "../../components/Pagination";


export default function Eventos() {
    const [eventos, setEventos] = useState([]);
    const [evento, setEvento] = useState({});
    const [addEvent, setAddEvent] = useState(true);
    const [eventReload, setEventReload] = useState(true);
    const [filters, setFilters] = useState({
        nombre: null,
        fechaInicio: null,
        fechaFin: null,
        last: 2,
        first: 0
    });
    const [showModal, setShowModal] = useState(false);
    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(10);
    const [total, setTotal] = useState(0);

    const handlerChangeFilter = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value.trim() !== '' ? value.trim() : null,
        });
        console.log(filters);
    }
    const handlerFilter = () => {
        setEventReload(true);
        console.log(filters);
    }

    const handleClose = () => {
        setAddEvent({});
        setShowModal(false);
    };

    const handleOpenEdit = (addEvent) => {
        setEvento(addEvent);
        setAddEvent(false);
        setShowModal(true);
    };
    const handleOpenAdd = () => {
        setAddEvent(true);
        setShowModal(true);
    };

    const { listarEventos, traerTodoEventos } = Consultas;

    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
        setEventReload(true);
    };

    useEffect(() => {
        if (eventReload) {
            consultarEvent();
            setEventReload(false);
        }
    }, [eventReload]);

    const consultarEvent = async () => {
        const indexLast = currentPage * perPage;
        const indexFirst = indexLast - perPage;
        const _filters = { ...filters, last: indexLast, first: indexFirst }
        try {
            const _eventos = await listarEventos(_filters);
            const _allEventos = await traerTodoEventos(_filters);
            setTotal(_allEventos.total);
            setEventos(_eventos);
            console.log(_eventos);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="mt-3">
                <header className="container mb-3"></header>
                <section className='container mb-3'>
                    <div className="d-flex align-items-center">
                        <div className="col">
                            <h2 className="mb-3">Eventos</h2>
                        </div>
                        <div className="col-2 d-flex justify-content-center">
                            <div>
                                <Button variant="primary" onClick={handleOpenAdd}>Agregar evento</Button>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className="d-flex justify-content-around align-items-center mb-3">
                        <div className="col-5">
                            <h5>Titulo</h5>
                            <Form.Control type="text" name="nombre" onChange={handlerChangeFilter} placeholder="Buscar por título" defaultValue={filters.nombre} />
                        </div>
                        <div className="col-4 d-flex gap-3">
                            <div className="col">
                                <h5>Fecha Inicio</h5>
                                <Form.Control type="date" name="fechaInicio" onChange={handlerChangeFilter} placeholder="Buscar por título" defaultValue={filters.fechaInicio} />
                            </div>
                            <div className="col">
                                <h5>Fecha Fin</h5>
                                <Form.Control type="date" name="fechaFin" onChange={handlerChangeFilter} placeholder="Buscar por título" defaultValue={filters.fechaFin} />
                            </div>
                        </div>
                        <div className="col-1">
                            <Button variant="primary" onClick={handlerFilter}>Buscar</Button>
                        </div>
                    </div>
                    <hr />
                    <div className="row row-cols-2 row-cols-lg-3 g-2 g-lg-3">
                        {eventos.map((evento, idx) => (
                            <div className="col" key={idx}>
                                <CardEventos evento={evento} handleOpenEdit={handleOpenEdit}></CardEventos>
                            </div>
                        ))}
                    </div>
                </section>
                <div className="container d-flex justify-content-center">
                    <PaginationTouch
                        total={total}
                        paginate={paginate}
                        perPages={perPage}
                        page={currentPage}>
                    </PaginationTouch>
                </div>
            </div>
            <ModalEventos
                addEvent={addEvent}
                setEventReload={setEventReload}
                show={showModal}
                handleClose={handleClose}
                evento={evento}
            ></ModalEventos>
        </>
    )
}
