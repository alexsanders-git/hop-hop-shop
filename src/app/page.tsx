import Hero from '@/template/Hero/Hero';
import TopSales from '@/template/TopSales/TopSales';
import NewArrivals from '@/template/NewArrivals/NewArrivals';
import CategoryGrid from '@/template/CategoryGrid/CategoryGrid';

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
