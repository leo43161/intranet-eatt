import { pool } from "../../config/db";
const queryGetPagos = (cuenta) => `CALL sp_ListarPagos(${cuenta});`;

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return await getOrdenesDePago(req, res);
        case "POST":
            return await postOrdenDetalle(req, res);
        default:
            return res.status(400).send("Method not allowed");
    }
}

const getOrdenesDePago = async (req, res) => {
    const { cuenta } = req.query;
    try {
        const results = await pool.query(queryGetPagos(cuenta));
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const postOrdenDetalle = async (req, res) => {

};