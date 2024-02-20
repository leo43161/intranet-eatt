import { useEffect, useState } from "react";
import CardPrestador from "../../components/prestadores/CardPrestador";
import ModalEventos from "../../components/prestadores/ModalPrestadores";
import Consultas from "../../helpers/consultasHelpers";
import Button from 'react-bootstrap/Button';

export default function Prestadores() {
    const [prestadores, setPrestadores] = useState([]);
    const [prestador, setPrestador] = useState({});
    const [addPrest, setAddPrest] = useState(true);
    const [prestReload, setPrestReload] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => {
        setAddPrest({});
        setShowModal(false);
    };
    const handleOpen = (addPrest) => {
        setAddPrest(addPrest)
        setShowModal(true);
    }
    const { listarPrest } = Consultas;
    useEffect(() => {
        if (prestReload) {
            consultarPrest();
            setPrestReload(false)
        }
    }, [prestReload])


    const consultarPrest = async () => {
        try {
            const _prestadores = await listarPrest();
            setPrestadores(_prestadores);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="mt-3">
                <header className="container mb-3"></header>
                <section className='container'>
                    <div className="d-flex align-content-center justify-content-between py-2">
                        <h2>Prestadores</h2>
                        <Button onClick={() => handleOpen(true)} variant="primary">
                            Agregar prestador
                        </Button>
                    </div>
                    <div className="row row-cols-2 row-cols-lg-3 g-2 g-lg-3">
                        {prestadores.map((prestador, idx) => (
                            <div className="col" key={idx}>
                                <CardPrestador
                                    setPrestador={setPrestador}
                                    prestador={prestador}
                                    handleOpen={handleOpen}
                                    setPrestReload={setPrestReload}
                                ></CardPrestador>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <ModalEventos show={showModal} setPrestReload={setPrestReload} addPrest={addPrest} handleClose={handleClose} prestador={prestador}></ModalEventos>
        </>
    )
}
