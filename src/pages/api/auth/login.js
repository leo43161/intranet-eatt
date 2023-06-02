import jwt from "jsonwebtoken";
import { serialize } from "cookie";
export default function loginHandler(req, res) {
    const { usuario, password, recordar } = req.body._usuario;
    if (usuario === "leo" && password === 'admin') {
        console.log("Se hizo el login");
        const token = jwt.sign({
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