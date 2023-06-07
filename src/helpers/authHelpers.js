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
            "http://10.15.15.151:3000/api/auth/login"
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
            "http://10.15.15.151:3000/api/auth/login", { usuario }
        );
        if (response.status === 200) {
            const { usuario, rol } = response.data;
            const data = {
                usuario,
                rol
            };
            const jsonData = JSON.stringify(data);
            localStorage.setItem('userData', jsonData);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}
