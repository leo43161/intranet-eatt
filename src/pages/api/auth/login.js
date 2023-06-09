import { sign, verify } from "jsonwebtoken";
import { serialize } from "cookie";
import { pool } from "../../config/db";
const queryPostLogin = (nombre, password) => `CALL sp_VerificarLogin('${nombre}', '${password}');`;/* NO FUNCIONA */

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return await getLogin(req, res);
        case "POST":
            return loginHandler(req, res);
        case "PUT":
            return await putOrdenDetalle(req, res);
        default:
            return res.status(400).send("Method not allowed");
    }
}

const getLogin = (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ error: 'Token not found' });
    }
    try {
        verify(token, 'secret');
        return res.status(200).json('login confirmed');
    } catch (error) {
        return res.status(401).json({ error: 'Token not found' });
    }
}

const loginHandler = async (req, res) => {
    const { usuario, password, recordar } = req.body.usuario;
    try {
        const results = await pool.query(queryPostLogin(usuario, password));
        if (results[0].length > 0) {
            const { user, rol } = results[0][0];
            const token = sign({
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
                usuario: user,
                rol,
            }, 'secret');

            const serialized = serialize('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
                [recordar ? 'maxAge' : 'expires']: recordar ? (1000 * 60 * 60 * 24 * 30) : 0,
            });

            res.setHeader('Set-Cookie', serialized);
            return res.status(200).json({
                usuario: user,
                rol,
            });
        } else {
            return res.status(401).json({ error: "Invalid password and user" })
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
}