import { poolRemote } from "../../../config/db";
import { exectQueryGlobal } from "../../../helpers/dbHelpers";
const queryGetAct = (orden, ret) => `CALL sp_VerificarCargaDetalleOrdenPago(${orden},${ret});`;
const queryPostDetalle = ({ porcentaje, montoR, borrado, activo, codRetencion, idControl }) => `CALL sp_InsertarDetalleOrdenPago(${porcentaje},${montoR},${borrado},${activo},${codRetencion},${idControl});`;
const queryPutDetalle = ({ idDOP, porcentaje, montoR, borrado, activo, codRetencion, idControl }) => `CALL sp_ModificarDetalleOrdenPago(${idDOP},${porcentaje},${montoR},${borrado},${activo},${codRetencion},${idControl});`;
const queryUploadDetalle = ({ porcentaje, montoR, borrado, activo, codRetencion, idControl }) => `CALL sp_ActualizarDetalleOrdenPago(${porcentaje},${montoR},${borrado},${activo},${codRetencion},${idControl});`;

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return await getDetalleOrden(req, res);
        case "POST":
            return await postOrdenDetalle(req, res);
        case "PUT":
            const { detalleOrden } = req.body.params
            const { idDOP } = detalleOrden;
            if (idDOP) {
                return await putOrdenDetalle(req, res);
            } else {
                return await uploadOrdenDetalle(req, res);
            }
        default:
            return res.status(400).send("Method not allowed");
    }
}

const getDetalleOrden = async (req, res) => {
    const { orden, ret } = req.query
    try {
        const results = await poolRemote.query(queryGetAct(orden, ret));
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const postOrdenDetalle = async (req, res) => {
    const { detalleOrden } = req.body.params
    try {
        const results = await exectQueryGlobal(queryPostDetalle(detalleOrden));
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error, queryString: queryPostDetalle(detalleOrden) });
    }
};

const putOrdenDetalle = async (req, res) => {
    const { detalleOrden } = req.body.params
    try {
        const results = await exectQueryGlobal(queryPutDetalle(detalleOrden));
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error, queryString: queryPostDetalle(detalleOrden) });
    }
};

const uploadOrdenDetalle = async (req, res) => {
    const { detalleOrden } = req.body.params;
    try {
        const results = await exectQueryGlobal(queryUploadDetalle(detalleOrden));
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error, queryString: queryPostDetalle(detalleOrden) });
    }
};