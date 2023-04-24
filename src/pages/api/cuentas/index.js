import { pool } from "../../config/db";
const queryGetCuentas = () => `CALL sp_ListarCuentas();`;

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return await getCuentasEmisoras(req, res);
        case "POST":
            return await postOrdenDetalle(req, res);
        default:
            return res.status(400).send("Method not allowed");
    }
}

const getCuentasEmisoras = async (req, res) => {
    try {
        const results = await pool.query(queryGetCuentas());
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};