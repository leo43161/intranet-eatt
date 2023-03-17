
export default function OrdenDePago() {
    return (
        <div>
            <Alert variant={"danger"}>
                <h4 className="mb-3">Orden de pago: 3487</h4>
                <Card className="mb-2">
                    <Card.Body>
                        <div className="d-flex justify-content-between">
                            <div><span className="fw-bold">Fecha de pago:</span> 2023-02-08</div>
                            <div><span className="fw-bold">Proov:</span> MAGAL S.R.L.</div>
                            <div><span className="fw-bold">Neto:</span> 13015.00</div>
                            <div><span className="fw-bold">Fecha de fact:</span> 2023-02-02</div>
                            <div><span className="fw-bold">N° Factura:</span> 7-1421</div>
                            <div>
                                <Form.Check
                                    className="m-0"
                                    inline
                                    label=""
                                    name="group1"
                                    type={"radio"}
                                    id={`inline-radio-1`}
                                />
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <Card className="mb-2">
                    <Card.Body>
                        <div className="d-flex justify-content-between">
                            <div><span className="fw-bold">Fecha de pago:</span> 2023-02-08</div>
                            <div className="col-3 text-truncate"><span className="fw-bold">Proov:</span> ESCUDERO REFRIGERACIONES S.R.L.</div>
                            <div><span className="fw-bold">Neto:</span> 13015.00</div>
                            <div><span className="fw-bold">Fecha de fact:</span> 2023-02-02</div>
                            <div><span className="fw-bold">N° Factura:</span> 7-1421</div>
                            <div>
                                <Form.Check
                                    className="m-0"
                                    inline
                                    label=""
                                    name="group1"
                                    type={"radio"}
                                    id={`0`}
                                />
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Alert>
        </div>
    )
}
