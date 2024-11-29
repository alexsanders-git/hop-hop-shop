import type { Metadata } from 'next';

import Hero from '@/template/Hero/Hero';
import NewArrivals from '@/template/NewArrivals/NewArrivals';
import TopSales from '@/template/TopSales/TopSales';
import CategoryGridSection from '@/template/category-grid-section';
import dynamic from 'next/dynamic';

const VerificationPopup = dynamic(
	() => import('@/template/VerificationPopup'),
	{ ssr: false },
);

export const metadata: Metadata = {
	title: `Home - ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default function Home() {
	return (
		<>
			<VerificationPopup />
			<Hero />
			<NewArrivals />
			<TopSales />
			<CategoryGridSection />
		</>
	);
}
