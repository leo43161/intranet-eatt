import { pool } from "../../../config/db";
const queryGetProv = (cuit) => `CALL sp_VerificarCargaProveedor(${cuit});`;
const queryGetProveedores = () => `CALL sp_ListarProv();`;
const queryPostProv = ({ cuit, nombreP, domicilio, localidad, provincia, cp, telefono, email }) => `CALL sp_InsertarProveedor(${cuit},'${nombreP}','${domicilio}','${localidad}','${provincia}',${cp !== "" ? cp : "NULL"},'${telefono}','${email}');`;
const queryPutProv = ({ Cuit, password, NombreP, Domicilio, localidad, provincia, cp, Telefono, email, borrado, activo }) => `CALL sp_ModificarProveedor(${Cuit},'${password}','${NombreP}','${Domicilio}','${localidad}','${provincia}',${cp !== "" ? cp : "NULL"},'${Telefono}','${email}',${borrado},${activo});`;

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            const { cuit } = req.query
            if (cuit) { return await getProveedor(req, res) } else { return await getProveedores(req, res) }
        case "POST":
            return await postProveedor(req, res);
        case "PUT":
            return await putProveedor(req, res);
        default:
            return res.status(400).send("Method not allowed");
    }
}

const getProveedor = async (req, res) => {
    const { cuit } = req.query
    try {
        const results = await pool.query(queryGetProv(cuit));
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getProveedores = async (req, res) => {
    try {
        const results = await pool.query(queryGetProveedores());
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const putProveedor = async (req, res) => {
    const { proveedor } = req.body.params;
    try {
        const results = await pool.query(queryPutProv(proveedor));
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error, queryString: queryPutProv(proveedor) });
    }
};

const postProveedor = async (req, res) => {
    const { proveedor } = req.body.params
    console.log(queryPostProv(proveedor));
    try {
        const results = await pool.query(queryPostProv(proveedor));
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error, query:queryPostProv(proveedor) });
    }
};