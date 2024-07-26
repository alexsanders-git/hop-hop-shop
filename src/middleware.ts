import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const cartCookie = request.cookies.get('cart');

	if (
		!cartCookie ||
		!cartCookie.value ||
		JSON.parse(cartCookie.value)?.products?.length === 0
	) {
		return NextResponse.redirect(new URL('/cart', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/checkout'],
};
