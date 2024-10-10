'use client';
import Pagination from '@/components/dashboard/pagination/Pagination';
import styles from './styles.module.scss';
import { useFetch } from '@/hooks/useFetch';
import ProductCard from '@/components/ProductCard/ProductCard';
import { useState } from 'react';

interface IProps {}

export default function CatalogPage() {
	const { data, error, loading } = useFetch<IResponse<IProduct>>({
		endpoint: 'shop/products/',
	});
	console.log(data);

	const [page, setPage] = useState<number>(0);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.error.message}</div>;
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Catalog</h1>
			</div>
			<div className={styles.body}>
				<div className={styles.filters}></div>
				<div className={styles.data}>
					<div className={styles.products}>
						{data?.items.map((product) => (
							<div className={styles.product} key={product.id}>
								<ProductCard
									product={product}
									showCategory={true}
									showButtons={{ favorite: true, cart: true, checkout: true }}
								/>
							</div>
						))}
					</div>
					<div className={styles.pagination}>
						<Pagination
							num_pages={data!.pagination?.num_pages}
							currentPage={data!.pagination?.current_page}
							totalCount={data!.items_count}
							pageSize={10}
							onPageChange={async (page) => {
								// const res = await getDashboardCategories(page);
								// if (res.success) {
								// 	setNewData(res.data);
								// }
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
