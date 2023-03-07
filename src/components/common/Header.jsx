import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from 'next/router';

export default function Header() {
    const router = useRouter();
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Turismo Tucuman</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/pagos" active={router.asPath === "/pagos"}>Pagos</Nav.Link>
                        <Nav.Link href="/carga" active={router.asPath === "/carga"}>Cargar</Nav.Link>
                        <Nav.Link href="/provee" active={router.asPath === "/provee"}>Imprimir Comprobantes</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
