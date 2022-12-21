import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

export default function Carga() {
    return (
        <div>
            <ListGroup className="container mb-4">
                <ListGroup.Item className='col d-flex justify-content-center'>Pagos</ListGroup.Item>
            </ListGroup>
            <div className="container d-flex justify-content-center">
                <div className="col-8">
                    <Card className="p-4">
                        <h2 className="text-center mb-3">Arrastre para cargar el SIGEDOC</h2>
                        <div className=" d-flex justify-content-center">
                            <div style={{ border: "dashed 3px #6C757D", height: "300px" }} className="col-8 d-flex justify-content-center align-items-center rounded">
                                <div className="flex-column d-flex p-4">
                                    <FontAwesomeIcon size="3x" icon={faFileLines} />
                                    <h4 className="m-0">Arrastre aqui</h4>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
