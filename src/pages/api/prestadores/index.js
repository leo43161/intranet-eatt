import { poolEatt } from "../../../config/db";
const queryGetPrest = (cuit) => `CALL sp_VerificarCargaProveedor(${cuit});`;
const queryGetPrestadores = () => `CALL sp_ListarPrestadores();`;
const queryPostPrest = ({
    titulo,
    responsable,
    direccion,
    idLocalidad,
    telefono,
    email,
    web,
    facebook,
    instagram,
    actividades,
    visible,
}) => `CALL sp_InsertarPrestador("${titulo}","${responsable}","${direccion}",${idLocalidad},"${telefono}","${email}","${web}","${facebook}","${instagram}","${actividades}",${visible ? 1 : 0});`;
const queryPutPrest = ({
    id,
    titulo,
    responsable,
    direccion,
    idLocalidad,
    telefono,
    email,
    web,
    facebook,
    instagram,
    actividades,
    visible,
    activo
}) => `CALL sp_ModificarPrestador(${id},"${titulo}","${responsable}","${direccion}",${idLocalidad},"${telefono}","${email}","${web}","${facebook}","${instagram}","${actividades}",${visible ? 1 : 0},${activo ? 1 : 0});`;

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return await getPrestadores(req, res);
        case "POST":
            return await postPrestador(req, res);
        case "PUT":
            console.log("Edita");
            return await putPrestador(req, res);
        default:
            return res.status(400).send("Method not allowed");
    }
}

const getPrestador = async (req, res) => {
    const { cuit } = req.query
    try {
        const results = await poolEatt.query(queryGetPrest(cuit));
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getPrestadores = async (req, res) => {
    try {
        console.log(queryGetPrestadores());
        const results = await poolEatt.query(queryGetPrestadores());
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const putPrestador = async (req, res) => {
    const { prest } = req.body.params;
    console.log(prest);
    console.log(queryPutPrest(prest));
    try {
        const results = await poolEatt.query(queryPutPrest(prest));
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error, queryString: queryPutPrest(prest) });
    }
};

const postPrestador = async (req, res) => {
    const { prestador } = req.body.params
    console.log(queryPostPrest(prestador));
    try {
        const results = await poolEatt.query(queryPostPrest(prestador));
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error, query: queryPostPrest(prestador) });
    }
};