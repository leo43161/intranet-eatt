import HomeButton from "../components/HomeButton";
import { useEffect, useState } from "react";
import rolesJson from "../roles.json"

export default function Home() {
  const [secciones, setSecciones] = useState([])
  useEffect(() => {
    const userDataJSON = localStorage.getItem('userData');
    const { rol } = JSON.parse(userDataJSON);
    const _roles = rolesJson.roles;
    const { secciones } = _roles.find((r) => r.id === rol);
    console.log(_roles);
    console.log(secciones);
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-center py-4">
        <div className="row row-cols-1 row-cols-md-2 g-3 col-6">
          {secciones.map(secciones => (<HomeButton></HomeButton>))}
          <HomeButton></HomeButton>
          <HomeButton></HomeButton>
          <HomeButton></HomeButton>
        </div>
      </div>
    </div>
  )
}
