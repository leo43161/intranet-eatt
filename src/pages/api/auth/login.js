import { sign, verify } from "jsonwebtoken";
import { serialize } from "cookie";

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

const loginHandler = (req, res) => {
    const { usuario, password, recordar } = req.body.usuario;
    if (usuario === "leo" && password === 'admin') {
        console.log("Se hizo el login");
        const token = sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            usuario: "leo",
            rol: 2,
            nombre: 'admin'
        }, 'secret');

        const serialized = serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            [recordar ? 'maxAge' : 'expires']: recordar ? (1000 * 60 * 60 * 24 * 30) : 0,
        });

        res.setHeader('Set-Cookie', serialized);
        return res.json({
            usuario: "leo",
            rol: 2,
        });
    }
    return res.status(401).json({ error: "Invalid password and user" })
}