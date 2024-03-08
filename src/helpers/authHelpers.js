import axios from 'axios'
import rolesJson from "../roles.json"

export const getRoles = () => {
    if (typeof window !== 'undefined') {
        const userDataJSON = localStorage.getItem('userData');
        if (userDataJSON) {
            const { rol } = JSON.parse(userDataJSON);
            const _roles = rolesJson.roles;
            const { secciones } = _roles.find((r) => r.id === rol);
            return secciones;
        } else {
            return [];
        }
    }
}

export const loginVerify = async () => {
    try {
        const response = await axios.get(
            `${process.env.urlServer}api/auth/login`
        );
        if (response.status === 200) {
            return true;
        } else {
            if (typeof window !== 'undefined') {
                const usuario = localStorage.getItem('userData');
                if (usuario) {
                    localStorage.removeItem('userData');
                }
            }
            return false;
        }
    } catch (error) {
        if (typeof window !== 'undefined') {
            const usuario = localStorage.getItem('userData');
            if (usuario) {
                localStorage.removeItem('userData');
            }
        }
        return false;
    }
}

export const login = async (usuario) => {
    try {
        const response = await axios.post(
            `${process.env.urlServer}api/auth/login`, { usuario }
        );
        if (response.status === 200) {
            const { usuario, rol, token } = response.data;
            const data = {
                usuario,
                rol,
                token
            };
            const jsonData = JSON.stringify(data);
            localStorage.setItem('userData', jsonData);
            return { login: true, msg: "Logueado" };
        } else if (response.status === 401) {
            return { login: false, msg: "Contraseña o usuario incorrecto" };
        }
    } catch (error) {
        if (error.response.status === 401) {
            return { login: false, msg: "Contraseña o usuario incorrecto" };
        } else {
            return { login: false, msg: "Hubo un error con la consulta, intente mas tarde" };
        }
    }
}
