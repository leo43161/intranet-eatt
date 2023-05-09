import { pool } from "../../config/db";
const queryGetProv = (cuit) => `CALL sp_VerificarCargaProveedor(${cuit});`;
const queryGetProveedores = () => `CALL sp_ListarProv();`;
const queryPostProv = ({ cuit, nombreP, domicilio, telefono, email }) => `CALL sp_InsertarProveedor(${cuit},'${nombreP}','${domicilio}','${telefono}','${email}');`;

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            const { cuit } = req.query
            if (cuit) { return await getProveedor(req, res) } else { return await getProveedores(req, res) }
        case "POST":
            return await postProveedor(req, res);
        default:
            return res.status(400).send("Method not allowed");
    }
}

const getProveedor = async (req, res) => {
    const { cuit } = req.query
    console.log(queryGetProv(cuit));
    try {
        const results = await pool.query(queryGetProv(cuit));
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getProveedores = async (req, res) => {
    try {
        console.log("pasa por aqui");
        console.log(queryGetProveedores());
        const results = await pool.query(queryGetProveedores());
        console.log(results);
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const postProveedor = async (req, res) => {
    const { proveedor } = req.body.params
    try {
        const results = await pool.query(queryPostProv(proveedor));
        return res.status(200).json(results);
    } catch (error) {
        console.log(queryPostProv(proveedor))
        return res.status(500).json({ error });
    }
};