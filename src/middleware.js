import { NextResponse } from "next/server";
import { jwtVerify } from 'jose'

export async function middleware(request) {
    const jwt = request.cookies.get("token");
    if (jwt === undefined) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    try {
        const { payload } = await jwtVerify(jwt.value, new TextEncoder().encode('secret'));
        console.log(payload);
        /* console.log(payload); */
        return NextResponse.next();
    } catch (error) {
        console.error(error);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/'],
};
