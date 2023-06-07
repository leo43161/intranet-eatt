import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Header({ setLoggedReload }) {
    const router = useRouter();
    const [secciones, setSecciones] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            const { getRoles } = await import('../../helpers/authHelpers');
            const fetchedSecciones = getRoles();
            setSecciones(fetchedSecciones);
        };

        fetchRoles();
    }, []);

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout');
            setLoggedReload(true);
            router.push('/login');
        } catch (error) {
            router.push('/login');
        }
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <div className="d-flex">
                        <Navbar.Brand href="/">Turismo Tucuman</Navbar.Brand>
                        <Nav className="me-auto">
                            {secciones &&
                                secciones.map(({ nombre, ruta }, idx) => (
                                    <Nav.Link
                                        key={idx}
                                        href={ruta}
                                        active={router.asPath === ruta}
                                    >
                                        {nombre}
                                    </Nav.Link>
                                ))}
                        </Nav>
                    </div>
                    <div>
                        <Button className="d-flex align-items-center" variant="danger" onClick={logout}>
                            <span>Cerrar Sesion</span>
                            <FontAwesomeIcon className="ms-2" size="1x" icon={faRightFromBracket} />
                        </Button>
                    </div>
                </Container>
            </Navbar>
        </>
    );
}