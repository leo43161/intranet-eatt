import { verify } from "jsonwebtoken";
import { serialize } from "cookie";
export default function logoutHandler(req, res) {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ error: 'Token not found' });
    }
    try {
        verify(token, 'secret');
        const serialized = serialize('token', null, {
            httpOnly: true,
            secure: false /* process.env.NODE_ENV === 'production' */,
            sameSite: 'strict',
            maxAge: 0,
            path: '/'
        })
        res.setHeader('Set-Cookie', serialized);
        return res.status(200).json('logout succesfully');
    } catch (error) {
        return res.status(401).json({ error: 'Token not found' });
    }
}