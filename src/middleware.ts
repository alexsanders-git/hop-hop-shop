import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const { pathname, origin } = request.nextUrl;
	const cartCookie = request.cookies.get('cart');
	const userCookie = request.cookies.get('user');
	if (pathname.startsWith('/checkout')) {
		if (
			!cartCookie ||
			!cartCookie.value ||
			JSON.parse(cartCookie.value)?.state?.cart === null ||
			JSON.parse(cartCookie.value)?.state?.cart.products?.length === 0
		) {
			return NextResponse.redirect(new URL('/cart', origin));
		}
	}
	if (pathname.startsWith('/dashboard')) {
		if (
			!userCookie ||
			!userCookie.value ||
			JSON.parse(userCookie?.value)?.state?.user?.user_role !== 'Admin'
		) {
			return NextResponse.redirect(new URL('/login', origin));
		}
	}
	if (pathname.startsWith('/account')) {
		if (
			!userCookie ||
			!userCookie.value ||
			JSON.parse(userCookie?.value)?.state?.user === null
		) {
			return NextResponse.redirect(new URL('/login', origin));
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/checkout', '/dashboard/:path*', '/account/:path*'],
};
