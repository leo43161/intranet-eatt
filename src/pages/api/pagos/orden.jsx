import { pool } from "../../config/db";
const queryGetOrdenVerf = (orden, cuit) => `CALL sp_VerificarCargaOrdenPago(${orden},${cuit});`;
const queryPostOrden = ({ codOp, factura, fechaPago, tipoFactura, montoBase, pagada, borrado, activo, cuit, idCuentaEmisora, libramiento }) => `CALL sp_InsertarOrdenPago(${codOp},'${factura}','${fechaPago}','${tipoFactura ? tipoFactura : "A"}',${montoBase},${pagada},${borrado},${activo},${cuit},${idCuentaEmisora},'${libramiento}');`;

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return await getOrdenPago(req, res);
        case "POST":
            return await postOrdenPago(req, res);
        default:
            return res.status(400).send("Method not allowed");
    }
}

const getOrdenPago = async (req, res) => {
    const { orden, cuit } = req.query
    try {
        const results = await pool.query(queryGetOrdenVerf(orden, cuit));
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const postOrdenPago = async (req, res) => {
    const { ordenPago } = req.body.params
    console.log(queryPostOrden(ordenPago));
    try {
        const results = await pool.query(queryPostOrden(ordenPago));
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error });
    }
};