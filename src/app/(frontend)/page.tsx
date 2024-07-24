import CategoryGrid from '@/template/CategoryGrid/CategoryGrid';
import Hero from '@/template/Hero/Hero';
import NewArrivals from '@/template/NewArrivals/NewArrivals';
import TopSales from '@/template/TopSales/TopSales';

export default function Home() {
	return (
		<>
			<Hero />
			<NewArrivals />
			<TopSales />
			<CategoryGrid />
		</>
	);
}
