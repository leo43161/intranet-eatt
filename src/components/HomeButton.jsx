import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faFileLines, faUserTie, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'
export default function HomeButton({ seccion }) {
    const { titulo, icono, ruta } = seccion
    const icons = { faBook, faFileLines, faUserTie, faCalendarDays };
    return (
        <div className="col">
            <Link className="text-dark text-decoration-none" href={ruta}>
                <div className="card">
                    <div className="d-flex align-items-center justify-content-center py-4">
                        <FontAwesomeIcon size="3x" icon={icons[icono]} />
                        <h4 className="ms-3">{titulo}</h4>
                    </div>
                </div>
            </Link>
        </div>
    )
}
