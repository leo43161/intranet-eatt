import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';
import rolesJson from './roles.json';

export async function middleware(request) {
    const jwt = request.cookies.get("token");
    const currentPath = request.nextUrl.pathname;
    if (jwt === undefined) {
        if (currentPath === '/login') {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }
    try {
        const { payload } = await jwtVerify(jwt.value, new TextEncoder().encode('secret'));
        // Obtener el rol del usuario desde el payload del token
        const userRole = payload.rol;

        // Buscar el rol en el JSON de roles y rutas
        const role = rolesJson.roles.find(role => role.id === userRole);

        // Verificar si el usuario tiene acceso a la ruta actual
        if (!role || !role.rutas.includes(currentPath)) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        if (currentPath === '/login') {
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    } catch (error) {
        console.error(error);
        if (currentPath === '/login') {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: [
        '/',
        '/carga',
        '/pagos',
        '/proveedores',
        '/login',
        '/eventos',
        '/prestadores',
        '/agencias'
    ],
};
