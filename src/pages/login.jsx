import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export default function Login() {
  return (
    <div className="login">
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-4">
          <div style={{ marginTop: '40px' }}>
            <Card className='shadow'>
              <Card.Body>
                <div className="d-flex justify-content-center">
                  <img src="img/logoMarcaTucuman.svg" className='col-8' alt="" />
                </div>
                <Form>
                  <Form.Group className="mb-3" controlId="user">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="email" placeholder="User123" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="********" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="recordarme" defaultChecked={true}>
                    <Form.Check type="checkbox" label="Recordarme" />
                  </Form.Group>
                  <Button className='w-100 py-2' variant="primary" type="submit">
                    Entrar
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
