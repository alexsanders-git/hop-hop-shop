'use client';
import { forwardRef, Ref } from 'react';
import styles from './SearchBarWrapper.module.scss';
import SearchIcon from '../../../../public/headerImage/search.svg';
import SearchBar from '@/components/SearchBar/SearchBar';

export interface InterfaceSearchBarWrapper {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
}

function SearchBarWrapper(
  props: InterfaceSearchBarWrapper,
  ref: Ref<HTMLDivElement>
) {
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
