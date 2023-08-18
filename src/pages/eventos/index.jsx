import CardEventos from "../../components/eventos/CardEventos";

export default function Eventos() {
    return (
        <>
            <div className="mt-3">
                <header className="container mb-3"></header>
                <section className='container'>
                    <h2>Eventos</h2>
                    <div class="row row-cols-2 row-cols-lg-3 g-2 g-lg-3">
                        <div class="col">
                            <CardEventos></CardEventos>
                        </div>
                        <div class="col">
                            <CardEventos></CardEventos>
                        </div>
                        <div class="col">
                            <CardEventos></CardEventos>
                        </div>
                        <div class="col">
                            <CardEventos></CardEventos>
                        </div>
                        <div class="col">
                            <CardEventos></CardEventos>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
