import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DropZone from '../../components/Dropzone';
import { formatearTxt, checkPagos, subirPagos } from '../../helpers/pagosHelpers';
import ModalPagos from './ModalPagos';

export default function Carga() {
    const [pagosFitered, setPagosFitered] = useState(null);
    const [pagoFile, setPagoFile] = useState(null);
    const [pagos, setPagos] = useState(null);
    const [deudasFile, setDeudasFile] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handlerPagos = async () => {
        if (pagoFile) {
            let lector = new FileReader();
            lector.onload = function (event) {
                const result = event.target.result;
                const _pagos = formatearTxt(result, 1);
                setPagos(_pagos);
                const pagosRepeat = checkPagos(_pagos);
                if (pagosRepeat.length > 0) {
                    setPagosFitered(pagosRepeat);
                    handleShow();
                    return;
                }
                setPagosFitered(null);
                subirPagos(_pagos);
            }

            lector.readAsText(pagoFile);
        }
    }
    return (
        <>
            <div className="mt-4">
                <div className="container d-flex justify-content-center">
                    <div className="col-6 me-3">
                        <Card className="p-4 shadow">
                            <h1 className="text-center">Pagos</h1>
                            <h3 className="text-center mb-3">Inserte el archivo txt</h3>
                            <div className="d-flex justify-content-center mb-3" style={{ height: "300px" }}>
                                <DropZone setState={setPagoFile}></DropZone>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Button variant="success" onClick={handlerPagos} disabled={!pagoFile}>
                                    <span className="">Subir pagos</span>
                                </Button>
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
                            <div className="d-flex justify-content-center">
                                <Button variant="success" onClick={() => handleShow()}>
                                    <span className="">Subir deudas</span>
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            {pagosFitered && <ModalPagos handleClose={handleClose} show={show} pagosFitered={pagosFitered} pagos={pagos}></ModalPagos>}
        </>
    )
}
