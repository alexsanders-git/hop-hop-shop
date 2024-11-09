import { NextRequest, NextResponse } from 'next/server';
import { Client, resources } from 'coinbase-commerce-node';

// Ініціалізація Coinbase API
Client.init(String(process.env.COINBASE_API));
const { Charge } = resources;

export async function POST(request: NextRequest) {
	const { totalPrice } = await request.json();

	try {
		const chargeData = {
			name: 'HopHopShop',
			description: 'Where Every Hop Counts for Cool EDC Gear!',
			pricing_type: 'fixed_price',
			local_price: {
				amount: totalPrice,
				currency: 'USD',
			},
		};

		const charge = await Charge.create(chargeData);

		return NextResponse.json({ charge });
	} catch (e) {
		return NextResponse.json({ error: e }, { status: 500 });
	}
}
