'use client';
import { forwardRef, Ref } from 'react';

import SearchBar from '@/components/SearchBar/SearchBar';

import styles from './SearchBarWrapper.module.scss';
import SearchIcon from '../../../../public/headerImage/search.svg';

export interface ISearchBarWrapper {
	isShow: boolean;
	setIsShow: (isShow: boolean) => void;
}

function SearchBarWrapper(props: ISearchBarWrapper, ref: Ref<HTMLDivElement>) {
	const { setIsShow, isShow } = props;
	return (
		<>
			{!isShow && (
				<button className={styles.icons_item} onClick={() => setIsShow(true)}>
					<SearchIcon />
				</button>
			)}
			{isShow && <SearchBar handleSearchButton={setIsShow} ref={ref} />}
		</>
	);
}

export default forwardRef(SearchBarWrapper);
