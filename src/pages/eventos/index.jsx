import { useState } from "react";
import CardEventos from "../../components/eventos/CardEventos";
import ModalEventos from "../../components/eventos/ModalEventos";

export default function Eventos() {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleOpen = () => setShowModal(true);
    const evento = {
        Cuit: null,
        NombreP: "",
        Domicilio: "",
        localidad: "",
        provincia: "",
        cp: null,
        Telefono: "",
        email: "",
        borrado: 0,
        activo: 1,
        password: ""
    }
    return (
        <>
            <div className="mt-3">
                <header className="container mb-3"></header>
                <section className='container'>
                    <h2>Eventos</h2>
                    <div class="row row-cols-2 row-cols-lg-3 g-2 g-lg-3">
                        <div class="col">
                            <CardEventos handleOpen={handleOpen}></CardEventos>
                        </div>
                        <div class="col">
                            <CardEventos handleOpen={handleOpen}></CardEventos>
                        </div>
                        <div class="col">
                            <CardEventos handleOpen={handleOpen}></CardEventos>
                        </div>
                        <div class="col">
                            <CardEventos handleOpen={handleOpen}></CardEventos>
                        </div>
                        <div class="col">
                            <CardEventos handleOpen={handleOpen}></CardEventos>
                        </div>
                    </div>
                </section>
            </div>
            <ModalEventos show={showModal} handleClose={handleClose} evento={evento}></ModalEventos>
        </>
    )
}
