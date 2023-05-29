import jwt from "jsonwebtoken";
import { serialize } from "cookie";
export default function loginHandler(req, res) {
    const { usuario, password, recordar } = req.body._usuario;
    if (usuario === "leo" && password === 'admin') {
        console.log("Se hizo el login");
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            usuario: "leo",
            nombre: 'proveedor'
        }, 'secret');

        const serialized = serialize('myTokenName', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            [recordar ? 'maxAge' : 'expires']: recordar ? (1000 * 60 * 60 * 24 * 30) : 0,
            path: '/'
        });

        res.setHeader('Set-Cookie', serialized);
        return res.json('login satisfactorio');
    }
    return res.status(401).json({ error: "Invalid password and user" })
}