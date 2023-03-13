import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DropZone from '../../components/Dropzone';
import leerArchivo from '../../helpers/pagosHelpers';

export default function Carga() {
    const [pagoFile, setPagoFile] = useState(null);
    const [deudasFile, setDeudasFile] = useState(null);
    return (
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
                            <Button variant="success" onClick={() => leerArchivo(pagoFile, 1)} disabled={!pagoFile}>
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
                            <Button variant="success" onClick={() => leerArchivo(deudasFile)} disabled={!deudasFile}>
                                <span className="">Subir deudas</span>
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
