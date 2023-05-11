import { pool } from "../../config/db";
const queryGetProv = (cuit) => `CALL sp_VerificarCargaProveedor(${cuit});`;/* NO FUNCIONA */
const queryGetProveedores = () => `CALL sp_ListarProv();`;/* NO FUNCIONA */
const queryPostUser = ({ cuit, nombreU, nombre, apellido, email, password, activo, tipo }) => `CALL sp_InsertarUsuario(${cuit},'${nombreU}','${nombre}','${apellido}','${email}','${password}',${activo},${tipo});`;

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            const { cuit } = req.query
            if (cuit) { return await getProveedor(req, res) } else { return await getProveedores(req, res) }
        case "POST":
            return await postUser(req, res);
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

const postUser = async (req, res) => {
    const { _userProv } = req.body.params
    console.log(queryPostUser(_userProv));
    try {
        const results = await pool.query(queryPostUser(_userProv));
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error });
    }
};