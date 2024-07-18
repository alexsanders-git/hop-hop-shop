'use client';

import { useRouter } from 'next/navigation';
import { forwardRef, Ref, useEffect, useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import {
	fetchSearchData,
	ProductSearch,
} from '@/services/search/search.service';
import { robotoCondensed } from '@/styles/fonts/fonts';

import CloseIcon from './close.svg';
import SearchIcon from './search.svg';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
	handleSearchButton: (isShow: boolean) => void;
}

function SearchBar(props: SearchBarProps, ref: Ref<HTMLDivElement>) {
	const { handleSearchButton } = props;
	const [data, setData] = useState<ProductSearch[]>([]);
	const [query, setQuery] = useState('');
	const debouncedSearch = useDebounce(query.toLowerCase(), 500);
	const router = useRouter();

	const handleSuggestionClick = (id: number) => {
		router.push(`/product/${id}`);
		handleSearchButton(false);
	};

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const productData = await fetchSearchData(debouncedSearch);
				if (productData) {
					setData(productData);
				}
			} catch (error) {
				console.log('error: ', error);
			}
		};

		if (debouncedSearch !== '') {
			fetchProduct();
		}
	}, [debouncedSearch]);

	return (
		<div ref={ref} className={styles.searchContainer}>
			{query && (
				<>
					<button className={styles.searchButton}>
						<SearchIcon />
					</button>
					<button
						className={styles.closeButton}
						onClick={() => handleSearchButton(false)}
					>
						<CloseIcon />
					</button>
				</>
			)}
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className={`${styles.searchInput} ${robotoCondensed.className} ${query ? styles.searchInputWithQuery : ''}`}
				placeholder="Search"
			/>
			{data.length > 0 && debouncedSearch.length > 0 && (
				<div className={styles.suggestionsWrapper}>
					<div className={styles.suggestionsWrapperScrollBar}>
						<div className={styles.suggestionsContainer}>
							{data.map((suggestion, index) => (
								<div
									key={index}
									className={styles.suggestionItem}
									onClick={() => handleSuggestionClick(suggestion.id)}
								>
									{suggestion.name}
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default forwardRef(SearchBar);
