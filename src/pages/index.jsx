import { useEffect, useState } from 'react';
import HomeButton from '../components/HomeButton';

export default function Home() {
  const [secciones, setSecciones] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const { getRoles } = await import('../helpers/authHelpers');
      const fetchedSecciones = getRoles();
      setSecciones(fetchedSecciones);
    };

    fetchRoles();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center py-4">
        <div className="row row-cols-1 row-cols-md-2 g-3 col-6">
          {secciones ? (
            secciones.map((seccion, idx) => (
              <div key={idx}>
                <HomeButton seccion={seccion}></HomeButton>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}