import { poolEatt } from "../../../config/db";
import axios from "axios";
const queryGetImages = `CALL sp_ListarLocalidades();`;
const queryPostImages = `http://10.15.15.151/touchvanilla/api/imagenes`;

export default async function handler(req, res) {
    switch (req.method) {
        /* case "GET":
            return await getImages(req, res); */
        case "POST":
            return await postImage(req, res);
        default:
            return res.status(400).send("Method not allowed");
    }
}

/* const getImages = async (req, res) => {
    try {
        const results = await poolEatt.query(queryGetImages);
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
}; */
const postImage = async (req, res) => {
    try {
        // Obtener el token JWT de las cookies
        const token = "Hola precioso";
        /* console.log(req.body);
        console.log(token);
        const formData = req.body;
        // Verificar si el token JWT está presente
        if (!token) {
            throw new Error('Token JWT no encontrado en las cookies.');
        }
 */
        // Configurar la solicitud POST con Axios
        /*         const formData = new FormData();
                formData.append('imagen', image);
         */
        const response = await axios.post(queryPostImages, token);
        return res.status(200).json(response);
    } catch (error) {
        // Manejar errores
        console.error('Error al subir la imagen:', error);
        return res.status(500).json({ error });
    }
};