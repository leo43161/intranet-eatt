import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faFileLines, faUserTie } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'
export default function HomeButton() {
    return (
        <div className="col">
            <Link className="text-dark text-decoration-none" href="/carga">
                <div className="card">
                    <div className="d-flex align-items-center justify-content-center py-4">
                        <FontAwesomeIcon size="3x" icon={faFileLines} />
                        <h4 className="ms-3">Cargar digedoc</h4>
                    </div>
                </div>
            </Link>
        </div>
    )
}
