import type { Metadata } from 'next';

import Hero from '@/template/Hero/Hero';
import NewArrivals from '@/template/NewArrivals/NewArrivals';
import TopSales from '@/template/TopSales/TopSales';
import CategoryGridSection from '@/template/category-grid-section';
import AuthPopup from '@/components/AuthPopup';

export const metadata: Metadata = {
	title: `Home - ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default function Home() {
	return (
		<>
			<AuthPopup />
			<Hero />
			<NewArrivals />
			<TopSales />
			<CategoryGridSection />
		</>
	);
}
