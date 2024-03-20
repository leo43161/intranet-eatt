import { poolEatt } from "../../../config/db";
const queryGetActividades = `CALL sp_ListarActividades();`;
const queryPostActividad = ({ nombre, imagen, visible }) => `CALL sp_InsertarActividad('${nombre}','${imagen}', ${visible ? 1 : 0});`;
const queryPutActividad = ({ id, nombre, imagen, visible, activo }) => `CALL sp_ModificarActividad(${id},'${nombre}','${imagen}', ${visible ? 1 : 0}, ${activo ? 1 : 0});`;


export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return await getActividades(req, res)
        case "POST":
            return await postActividades(req, res);
        case "PUT":
            return await putActividades(req, res);
        default:
            return res.status(400).send("Method not allowed");
    }
}

const getActividades = async (req, res) => {
    try {
        const results = await poolEatt.query(queryGetActividades);
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};
const postActividades = async (req, res) => {
    const { actividad } = req.body.params;
    try {
        const results = await poolEatt.query(queryPostActividad(actividad));
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};
const putActividades = async (req, res) => {
    const { actividad } = req.body.params;
    try {
        const results = await poolEatt.query(queryPutActividad(actividad));
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};