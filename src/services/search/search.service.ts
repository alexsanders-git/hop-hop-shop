interface Image {
	image: string;
}

interface ProductAttributes {
	brand: string;
	material: string;
	style: string;
	size: number;
}

export interface ProductSearch {
	id: number;
	name: string;
	category: number;
	slug: string;
	price: string;
	SKU: number;
	description: string;
	views: number;
	images: Image[];
	product_attributes: ProductAttributes;
}

interface ApiResponse {
	success: boolean;
	data: IDashboardProducts;
}

export const fetchSearchData = async (
	search: string,
): Promise<IDashboardProducts | null> => {
	try {
		const baseURL = process.env.NEXT_PUBLIC_API_URL;
		const res = await fetch(`${baseURL}/shop/products/?name=${search}`, {
			next: { revalidate: 10 },
		});

		if (!res.ok) {
			throw new Error(`Error fetching product data: ${res.statusText}`);
		}

		const json: ApiResponse = await res.json();
		return json.data;
	} catch (error) {
		console.error('Failed to fetch product data:', error);
		return null;
	}
};
