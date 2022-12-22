import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DropZone from '../../components/Dropzone';

export default function Carga() {
    const [pagoFile, setPagoFile] = useState(null)
    return (
        <div>
            <ListGroup className="container mb-4">
                <ListGroup.Item className='col d-flex justify-content-center'>Pagos</ListGroup.Item>
            </ListGroup>
            <div className="container d-flex justify-content-center">
                <div className="col-8">
                    <Card className="p-4">
                        <h2 className="text-center mb-3">Arrastre para cargar los pagos</h2>
                        <div className="d-flex justify-content-center mb-3" style={{ height: "300px" }}>
                            <DropZone setState={setPagoFile}></DropZone>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Button variant="success" disabled={!pagoFile}>
                                <span className="">Subir pagos</span>
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
