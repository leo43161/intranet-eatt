import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DropZone from '../../components/Dropzone';
import leerArchivo from '../../helpers/pagosHelpers';

export default function Carga() {
    const [pagoFile, setPagoFile] = useState(null)
    return (
        <div className="mt-4">
            <div className="container d-flex justify-content-center">
                <div className="col-8">
                    <Card className="p-4 shadow">
                        <h2 className="text-center mb-3">Inserte el archivo txt para cargar los pagos</h2>
                        <div className="d-flex justify-content-center mb-3" style={{ height: "300px" }}>
                            <DropZone setState={setPagoFile}></DropZone>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Button variant="success" onClick={() => leerArchivo(pagoFile)} disabled={!pagoFile}>
                                <span className="">Subir pagos</span>
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
