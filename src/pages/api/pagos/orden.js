import { poolRemote } from "../../../config/db";
import { exectQueryGlobal } from "../../../helpers/dbHelpers";
const queryGetOrdenVerf = (orden) => `CALL sp_VerificarCargaOrdenPago(${orden});`;
const queryPostOrden = ({ codOp, factura, fechaPago, fechaFact, tipoFactura, montoBase, pagada, borrado, activo, cuit, idCuentaEmisora, libramiento, fantasma }) => `CALL sp_InsertarOrdenPago(${codOp},'${factura}','${fechaPago}','${fechaFact}','${tipoFactura ? tipoFactura : "A"}',${montoBase},${pagada},${borrado},${activo},${cuit},${idCuentaEmisora},'${libramiento}', ${fantasma});`;
const queryPutOrden = ({ idControl, codOp, factura, fechaPago, fechaFact, tipoFactura, montoBase, pagada, borrado, activo, cuit, idCuentaEmisora, libramiento, fantasma }) => `CALL sp_ModificarOrdenPago(${idControl},${codOp},'${factura}','${fechaPago}','${fechaFact}','${tipoFactura ? tipoFactura : "O"}',${montoBase},${pagada},${borrado},${activo},${cuit},${idCuentaEmisora},'${libramiento}', ${fantasma});`;
const queryUploadOrden = ({ codOp, factura, fechaPago, fechaFact, tipoFactura, montoBase, pagada, borrado, activo, cuit, idCuentaEmisora, libramiento, fantasma }) => `CALL sp_ActualizarOrdenPago(${codOp},'${factura}','${fechaPago}','${fechaFact}','${tipoFactura ? tipoFactura : "O"}',${montoBase},${pagada},${borrado},${activo},${cuit},${idCuentaEmisora},'${libramiento}', ${fantasma});`;

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return await getOrdenPago(req, res);
        case "POST":
            return await postOrdenPago(req, res);
        case "PUT":
            const { ordenPago } = req.body.params
            const { idControl } = ordenPago;
            if (idControl) {
                return await putOrdenPago(req, res);
            } else {
                return await uploadOrdenPago(req, res);
            }
        default:
            return res.status(400).send("Method not allowed");
    }
}

const getOrdenPago = async (req, res) => {
    const { orden } = req.query
    try {
        const results = await poolRemote.query(queryGetOrdenVerf(orden));
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const postOrdenPago = async (req, res) => {
    const { ordenPago } = req.body.params
    try {
        const results = await exectQueryGlobal(queryPostOrden(ordenPago));
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const putOrdenPago = async (req, res) => {
    const { ordenPago } = req.body.params
    try {
        const results = await exectQueryGlobal(queryPutOrden(ordenPago));
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error });
    }
};
const uploadOrdenPago = async (req, res) => {
    const { ordenPago } = req.body.params
    try {
        const results = await exectQueryGlobal(queryUploadOrden(ordenPago));
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error });
    }
};