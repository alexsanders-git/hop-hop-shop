import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Middleware function to check if the cart is empty
export function middleware(req: NextRequest) {
	return NextResponse.next();
}

export const config = {
	matcher: ['/checkout'],
};
