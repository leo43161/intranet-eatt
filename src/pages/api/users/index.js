import { poolLocal } from "../../../config/db";
import { exectQueryGlobal } from "../../../helpers/dbHelpers";
const queryGetProv = (id) => `CALL sp_VerificarCargaUser ESTO NO EXISTE(${id});`;/* NO FUNCIONA */
const queryGetUserCuit = (cuit) => `CALL sp_VerificarCargaUserCuit(${cuit});`;/* NO FUNCIONA */
const queryGetProveedores = () => `CALL sp_ListarProv  ESTO NO EXISTE();`;/* NO FUNCIONA */
const queryPostUser = ({ cuit, nombreU, nombre, apellido, email, password, activo, tipo }) => `CALL sp_InsertarUsuario(${cuit},'${nombreU}','${nombre}','${apellido}','${email}','${password}',${activo},${tipo});`;

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            const { id, cuit } = req.query
            if (id || cuit) { return await getUser(req, res) } else { return await getUsers(req, res) }
        case "POST":
            return await postUser(req, res);
        default:
            return res.status(400).send("Method not allowed");
    }
}

const getUser = async (req, res) => {
    const { cuit, id } = req.query;
    const query = cuit ? queryGetUserCuit(cuit) : queryGetProv(id);
    try {
        const results = await poolLocal.query(query)
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getUsers = async (req, res) => {
    try {
        const results = await poolLocal.query(queryGetProveedores());
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const postUser = async (req, res) => {
    const { _userProv } = req.body.params
    try {
        const results = await exectQueryGlobal(queryPostUser(_userProv));
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error });
    }
};