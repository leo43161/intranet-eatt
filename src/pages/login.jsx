import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router'
import { useState } from 'react'
import Card from 'react-bootstrap/Card';
import { login } from '../helpers/authHelpers';

export default function Login({ setLoggedReload }) {
  const [usuario, setUser] = useState({
    usuario: "",
    password: "",
  })
  const [recordar, setRecordar] = useState(false)
  const router = useRouter();
  const handleChange = (e) => {
    console.log(e.target.checked);
    setUser({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const _usuario = { ...usuario, recordar };
    console.log(_usuario);
    const response = await login(_usuario);
    if (response) {
      setLoggedReload(true);
      router.push("/");
    }
  }
  return (
    <div className="login">
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-lg-4 col-md-10 pt-5">
          <div style={{ marginTop: '40px' }}>
            <Card className='shadow'>
              <Card.Body>
                <div className="d-flex justify-content-center">
                  <img src="img/logoMarcaTucuman.svg" className='col-8' alt="" />
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="usuario">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control onChange={handleChange} name='usuario' type="text" placeholder="User123" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control onChange={handleChange} name="password" type="password" placeholder="********" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="recordarme">
                    <Form.Check type="checkbox" onChange={(e) => setRecordar(e.target.checked)} name='recordar' checked={recordar} label="Recordarme" />
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
