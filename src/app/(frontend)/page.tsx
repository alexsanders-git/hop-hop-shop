import Hero from '@/template/Hero/Hero';
import NewArrivals from '@/template/NewArrivals/NewArrivals';
import TopSales from '@/template/TopSales/TopSales';
import CategoryGrid from '@/template/category-grid';

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
