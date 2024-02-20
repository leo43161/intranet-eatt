import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DropZone from '../../components/Dropzone';
import { formatearTxt, checkPagosRepeat, subirPagos, subirDeudas, checkDeudas } from '../../helpers/cargaHelpers';
import Swal from 'sweetalert2';
import ModalPagos from './ModalPagos';

export default function Carga() {
    const [pagosFitered, setPagosFitered] = useState(null);
    const [pagoFile, setPagoFile] = useState(null);
    const [pagos, setPagos] = useState(null);
    const [deudasFile, setDeudasFile] = useState(null);
    const [show, setShow] = useState(false);
    const [pagosUpload, setPagosUpload] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlerPagos = async () => {
        if (pagoFile) {
            let lector = new FileReader();
            lector.onload = async function (event) {
                const result = event.target.result;
                const _pagos = formatearTxt(result, 1);
                try {
                    setPagos(_pagos);
                    const pagosRepeat = checkPagosRepeat(_pagos);
                    if (pagosRepeat.length > 0) {
                        setPagosFitered(pagosRepeat);
                        handleShow();
                        return;
                    }
                    // Muestra el mensaje de "Cargando pagos"
                    Swal.fire({
                        title: 'Cargando pagos',
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        onBeforeOpen: () => {
                            Swal.showLoading();
                        },
                    });
                    setPagosFitered(null);
                    setPagosUpload(true);
                    await subirPagos(_pagos);
                    // Simula una carga de 30 segundos
                    setTimeout(async () => {
                        // Cierra el Swal loading
                        Swal.close();
                        Swal.fire({
                            icon: 'success',
                            title: 'Se han guardado correctamente los pagos',
                        });
                    }, 30000); // 30 segundos (30000 milisegundos)

                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ha ocurrido un problema al intentar subir los pagos',
                    });
                    console.log(error);
                }
            }
            lector.readAsText(pagoFile);
        }
    }


    const handlerDeudas = async () => {
        if (deudasFile && pagosUpload) {
            let lector = new FileReader();
            lector.onload = async function (event) {
                const result = event.target.result;
                const _deudas = formatearTxt(result, 2);
                const { deudasCheck, retFiltered } = checkDeudas(_deudas);
                console.log(retFiltered);
                try {
                    // Muestra el mensaje de "Cargando deudas"
                    Swal.fire({
                        title: 'Cargando deudas',
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        onBeforeOpen: () => {
                            Swal.showLoading();
                        },
                    });

                    // Simula una carga de 30 segundos
                    setTimeout(async () => {
                        await subirDeudas(deudasCheck);

                        // Cierra el Swal loading
                        Swal.close();

                        // Muestra el mensaje de éxito
                        Swal.fire({
                            icon: 'success',
                            title: 'Se han guardado correctamente las deudas',
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                if (/* retFiltered.length > 0 */ true) {
                                    Swal.fire({
                                        icon: "warning",
                                        title: "Estas rentenciones no tienene un codigo de retencion cargada",
                                        html: `
                                        <ul class="list-group list-group-flush">
                                            ${retFiltered.map(ret => `<li class="list-group-item">
                                                <p>N° Orden: ${ret.nOrden}</p>
                                                <p>R Social: ${ret.tipoRet}</p>
                                            </li>`)}
                                        </ul>
                                        `,
                                    });
                                }
                            }
                        });
                    }, 30000); // 30 segundos (30000 milisegundos)
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ha ocurrido un problema al intentar subir las deudas',
                    });
                    console.log(error);
                }
            };
            lector.readAsText(deudasFile);
        }
    };
    return (
        <>
            <div className="mt-4">
                <div className="container d-flex justify-content-center">
                    <div className="col-6 me-3">
                        <Card className="p-4 shadow">
                            {pagosUpload && <h4 className='position-absolute top-0 end-0 pt-2 pe-3'>Subido</h4>}
                            <h1 className="text-center">Pagos</h1>
                            <h3 className="text-center mb-3">Inserte el archivo txt</h3>
                            <div className="d-flex justify-content-center mb-3" style={{ height: "300px" }}>
                                <DropZone setState={setPagoFile}></DropZone>
                            </div>
                        </Card>
                    </div>
                    <div className="col-6">
                        <Card className="p-4 shadow">
                            <h1 className="text-center">Deudas</h1>
                            <h3 className="text-center mb-3">Inserte el archivo txt</h3>
                            <div className="d-flex justify-content-center mb-3" style={{ height: "300px" }}>
                                <DropZone setState={setDeudasFile}></DropZone>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className='d-flex justify-content-center col pt-4'>
                    <div className='col-10 d-flex justify-content-around'>
                        <Button variant="success" size="lg" onClick={() => handlerPagos()} disabled={!(pagoFile)}>
                            <span className="">Subir Pagos</span>
                        </Button>
                        <Button variant="success" size="lg" onClick={() => handlerDeudas()} disabled={!(deudasFile && pagosUpload)}>
                            <span className="">Subir Deudas</span>
                        </Button>
                    </div>
                </div>
            </div>
            {pagosFitered && <ModalPagos handleClose={handleClose} show={show} pagosFitered={pagosFitered} pagos={pagos} pagosHandler={setPagosUpload}></ModalPagos>}
        </>
    )
}
