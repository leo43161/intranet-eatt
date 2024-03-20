import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from 'next/router';
import seccionesArray from '../../categorias.json';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faBook, faFileLines, faUserTie, faCalendarDays, faPersonHiking } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Header({ setLoggedReload }) {
    const router = useRouter();
    const [secciones, setSecciones] = useState([]);
    const icons = { faBook, faFileLines, faUserTie, faCalendarDays, faPersonHiking };

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

    const seccionesSelected = seccionesArray.filter(_seccion => secciones.includes(_seccion.id));

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <div className="d-flex col-10">
                        <Navbar.Brand className='col' href="/">Turismo Tucuman</Navbar.Brand>
                        <Nav className="me-auto flex-grow-1 overflow-auto" style={{ scrollbarWidth: "none" }}>
                            {seccionesSelected?.map(({ nombre, ruta, icono }, idx) => (
                                <Nav.Link
                                    key={idx}
                                    href={ruta}
                                    active={router.asPath === ruta}
                                    className='d-flex align-items-center gap-2'
                                >
                                    <FontAwesomeIcon className="ms-2" size="1x" icon={icons[icono]} />
                                    {nombre}
                                </Nav.Link>
                            ))}
                        </Nav>
                    </div>
                    <div className='col ps-4'>
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