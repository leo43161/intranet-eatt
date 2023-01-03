import { pool } from "../../config/db";
const queryGetAct = (orden, ret) => `CALL sp_VerificarCargaDetalleOrdenPago(${orden},${ret});`;
const queryPostDetalle = ({ porcentaje, montoR, borrado, codRetencion, idControl }) => `CALL sp_InsertarOrdenPago(${porcentaje},${montoR},${borrado},${activo},${codRetencion},${idControl});`;

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return await getDetalleOrden(req, res);
            case "POST":
            return await postOrdenDetalle(req, res);
        default:
            return res.status(400).send("Method not allowed");
    }
}

const getDetalleOrden = async (req, res) => {
    const { orden, ret } = req.query
    try {
        const results = await pool.query(queryGetAct(orden, ret));
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const postOrdenDetalle = async (req, res) => {
    const { orden } = req.query
    try {
        const results = await pool.query(queryPostDetalle(orden));
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error });
    }
};