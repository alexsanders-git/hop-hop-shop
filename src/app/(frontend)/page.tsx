import type { Metadata } from 'next';

import Hero from '@/template/Hero/Hero';
import NewArrivals from '@/template/NewArrivals/NewArrivals';
import TopSales from '@/template/TopSales/TopSales';
import CategoryGridSection from '@/template/category-grid-section';

export const metadata: Metadata = {
	title: 'Home - HopHopShop',
};

export default function Home() {
	return (
		<>
			<Hero />
			<NewArrivals />
			<TopSales />
			<CategoryGridSection />
		</>
	);
}
