import { useEffect, useState } from "react";
import CardPrestador from "../../components/prestadores/CardPrestador";
import ModalEventos from "../../components/prestadores/ModalPrestadores";
import Consultas from "../../helpers/consultasHelpers";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Prestadores({ setLoader }) {
    const [prestadores, setPrestadores] = useState([]);
    const [prestador, setPrestador] = useState({});
    const [addPrest, setAddPrest] = useState(true);
    const [prestReload, setPrestReload] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPrestadores, setFilteredPrestadores] = useState([]);

    const handleClose = () => {
        setAddPrest({});
        setShowModal(false);
    };

    const handleOpen = (addPrest) => {
        setAddPrest(addPrest)
        setShowModal(true);
    };

    const { listarPrest } = Consultas;

    useEffect(() => {
        if (prestReload) {
            consultarPrest();
            setPrestReload(false);
        }
    }, [prestReload]);

    const consultarPrest = async () => {
        setLoader(true);
        try {
            const _prestadores = await listarPrest();
            setPrestadores(_prestadores);
            setFilteredPrestadores(_prestadores); // Inicializar los prestadores filtrados con todos los prestadores
            setLoader(false);
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    };

    // Función para filtrar prestadores por título
    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        const filtered = prestadores.filter(prestador => prestador.titulo.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredPrestadores(filtered);
    };

    return (
        <>
            <div className="mt-3">
                <header className="container mb-3"></header>
                <section className='container'>
                    <div className="d-flex align-content-center justify-content-between py-2">
                        <div>
                            <h2>Prestadores</h2>
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
                                Agregar prestador
                            </Button>
                        </div>
                    </div>
                    {filteredPrestadores.length === 0 ? (
                        <p>No se encontraron prestadores</p>
                    ) : (
                        <div className="row row-cols-2 row-cols-lg-3 g-2 g-lg-3">
                            {filteredPrestadores.map((prestador, idx) => (
                                <div className="col" key={idx}>
                                    <CardPrestador
                                        setPrestador={setPrestador}
                                        prestador={prestador}
                                        handleOpen={handleOpen}
                                        setPrestReload={setPrestReload}
                                        setLoader={setLoader}
                                    ></CardPrestador>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
            <ModalEventos
                show={showModal}
                setPrestReload={setPrestReload}
                addPrest={addPrest}
                handleClose={handleClose}
                prestador={prestador}
                setLoader={setLoader}
            ></ModalEventos>
        </>
    )
}