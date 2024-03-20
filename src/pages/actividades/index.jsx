import { useEffect, useState } from "react";
import CardActividad from "../../components/actividades/CardActividad";
import ModalActividad from "../../components/actividades/ModalActividad";
import Consultas from "../../helpers/consultasHelpers";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Agencias({ setLoader }) {
    const [actividades, setActividades] = useState([]);
    const [actividad, setActividad] = useState({});
    const [addActi, setAddActi] = useState(true);
    const [activReload, setActivReload] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredActividades, setFilteredActividades] = useState([]);

    const handleClose = () => {
        setAddActi({});
        setShowModal(false);
    };

    const handleOpen = (addActi) => {
        setAddActi(addActi)
        setShowModal(true);
    };

    const { listarActividades } = Consultas;

    useEffect(() => {
        if (activReload) {
            consultarPrest();
            setActivReload(false);
        }
    }, [activReload]);

    const consultarPrest = async () => {
        setLoader(true);
        try {
            const _actividades = await listarActividades();
            console.log(_actividades);
            setActividades(_actividades);
            setFilteredActividades(_actividades); // Inicializar los actividades filtrados con todos los actividades
            setLoader(false);
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    };

    // Función para filtrar actividades por título
    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        const filtered = actividades.filter(actividad => actividad.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredActividades(filtered);
    };

    return (
        <>
            <div className="mt-3">
                <header className="container mb-3"></header>
                <section className='container'>
                    <div className="d-flex align-content-center justify-content-between py-2">
                        <div>
                            <h2>Actividades</h2>
                        </div>
                        <div className="col-5">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Buscar por título" value={searchTerm} onChange={handleSearch} />
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
                            </div>
                        </div>
                        <div>
                            <Button onClick={() => handleOpen(true)} variant="primary">
                                Agregar actividad
                            </Button>
                        </div>
                    </div>
                    {filteredActividades.length === 0 ? (
                        <p>No se encontraron actividades</p>
                    ) : (
                        <div className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3 align-items-center">
                            {filteredActividades.map((actividad, idx) => (
                                <div className="col" key={idx}>
                                    <CardActividad
                                        setActividad={setActividad}
                                        actividad={actividad}
                                        handleOpen={handleOpen}
                                        setActivReload={setActivReload}
                                        setLoader={setLoader}
                                    ></CardActividad>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
            <ModalActividad
                show={showModal}
                setActivReload={setActivReload}
                addActi={addActi}
                handleClose={handleClose}
                actividad={actividad}
                setLoader={setLoader}
            ></ModalActividad>
        </>
    )
}