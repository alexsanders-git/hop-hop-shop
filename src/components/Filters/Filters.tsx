import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import { useCatalog } from '@/store/filters/Catalog.store';
import styles from './styles.module.scss';
import { robotoCondensed } from '@/styles/fonts/fonts';
import Sorting from '@/components/Sorting/Sorting';
import SortingCategory from '@/components/SortingCategory/SortingCategory';
import PriceFilter from '@/components/PriceFilter/PriceFilter';

interface IProps {
	disabled?: boolean;
	isLoading?: boolean;
}

export default function Filters({
	disabled = false,
	isLoading = false,
}: IProps) {
	const [isShow, setIsShow] = useState(true);

	const { setPriceRange, resetAll, setCategory, setSorting } = useCatalog(
		(state) => state,
	);
	const { minPrice, maxPrice, sorting, category } = useCatalog(
		(state) => state.catalog,
	);
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	// Функція для видалення параметра з URL
	const updateUrl = (param: string) => {
		const currentParams = new URLSearchParams(searchParams.toString());
		currentParams.delete(param);
		router.replace(`${pathname}?${currentParams.toString()}`);
	};

	// Обробник для очищення категорії
	const handleClearCategory = () => {
		updateUrl('category'); // Видаляємо параметр з URL
		setCategory(null); // Очищуємо в Zustand
	};

	// Обробник для очищення сортування
	const handleClearSorting = () => {
		updateUrl('ordering'); // Видаляємо параметр з URL
		setSorting(null); // Очищуємо в Zustand
	};

	// Обробник для очищення цінового діапазону
	const handleClearPrice = () => {
		updateUrl('minPrice'); // Видаляємо параметри minPrice і maxPrice з URL
		updateUrl('maxPrice');
		setPriceRange(0, 100); // Очищуємо в Zustand
	};

	// Функція для скидання всіх фільтрів
	const resetAllFilters = () => {
		resetAll();
		router.replace('/catalog');
	};

	return (
		<div
			className={`${styles.selectWrapper} ${disabled || (isLoading && styles.disabled)}`}
		>
			<div className={styles.selectContainer}>
				<div className={`${styles.select}`} onClick={() => setIsShow(!isShow)}>
					<span className={`${robotoCondensed.className} ${styles.value}`}>
						Filters
					</span>
					<SlidersHorizontal />
				</div>
				{isShow && (
					<div className={styles.optionsWrapper}>
						<div className={styles.suggestionsWrapperScrollBar}>
							<div className={styles.suggestionsContainer}>
								<div className={styles.wrappRest}>
									{(category?.name || sorting?.name || minPrice > 0) && (
										<div
											className={`${styles.reset} ${robotoCondensed.className}`}
											onClick={resetAllFilters}
										>
											Clear All
										</div>
									)}
									{category?.name && (
										<div
											className={`${styles.reset} ${styles.opacity} ${robotoCondensed.className}`}
										>
											<span>{category.name}</span>
											<X color="#192C32" onClick={handleClearCategory} />
										</div>
									)}
									{sorting?.name && (
										<div
											className={`${styles.reset} ${styles.opacity} ${robotoCondensed.className}`}
										>
											<span>{sorting.name}</span>
											<X color="#192C32" onClick={handleClearSorting} />
										</div>
									)}
									{minPrice > 0 && maxPrice && (
										<div
											className={`${styles.reset} ${styles.opacity} ${robotoCondensed.className}`}
										>
											<span>
												{minPrice}-{maxPrice}
											</span>
											<X color="#192C32" onClick={handleClearPrice} />
										</div>
									)}
								</div>
								<Sorting />
								<PriceFilter />
								<SortingCategory />
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
