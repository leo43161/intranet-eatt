import axios from 'axios'

export const getRoles = (req, res) => {

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