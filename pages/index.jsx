import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faFileLines } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <div className="d-flex justify-content-center py-4">
        <div className="row row-cols-1 row-cols-md-2 g-3 col-6">
          <div className="col">
            <Link href="/pagos">
              <div className="card">
                <div className="d-flex align-items-center justify-content-center py-4">
                  <FontAwesomeIcon size="3x" icon={faFileLines} />
                  <h4 className="ms-3">Cargar digedoc</h4>
                </div>
              </div>
            </Link>
          </div>
          <div className="col">
            <div className="card">
              <div className="d-flex align-items-center justify-content-center py-4">
                <FontAwesomeIcon size="3x" icon={faBook} />
                <h4 className="ms-3">Pagos registrados</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
