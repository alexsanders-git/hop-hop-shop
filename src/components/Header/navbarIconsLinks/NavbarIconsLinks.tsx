'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import SearchBarWrapper from '@/components/Header/searchBarWrapper/SearchBarWrapper';
import useOutside from '@/hooks/useOutside';
import { useCart } from '@/store/cart/Cart.store';
import { useFavorite } from '@/store/favorite/Favorite.store';
import { useFormStore } from '@/store/useForm/useForm.store';

import styles from './navbarIconsLinks.module.scss';
import AccountIcon from '../../../../public/headerImage/account.svg';
import LikeIcon from '../../../../public/headerImage/like.svg';
import ShoppingCartIcon from '../../../../public/headerImage/shopping-cart.svg';

function NavbarIconsLinks() {
	const { ref, setIsShow, isShow } = useOutside(false);
	const { favorites } = useFavorite();
	const totalItems = useCart((state) => state.cart?.total_items || 0);
	const setActiveForm = useFormStore((state) => state.setActiveForm);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownVisible(!isDropdownVisible);
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsDropdownVisible(false);
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setIsDropdownVisible(false);
		}
	};

	useEffect(() => {
		if (isDropdownVisible) {
			document.addEventListener('mousedown', handleOutsideClick);
			document.addEventListener('keydown', handleKeyDown);
		} else {
			document.removeEventListener('mousedown', handleOutsideClick);
			document.removeEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isDropdownVisible]);

	return (
		<div className={styles.icons_list}>
			<div className={styles.icons_list__search}>
				<SearchBarWrapper isShow={isShow} setIsShow={setIsShow} ref={ref} />
			</div>

			<Link href="/favorites" className={styles.icons_item}>
				{favorites.length > 0 && (
					<div className={styles.qty}>{favorites.length}</div>
				)}
				<LikeIcon />
			</Link>

			<Link href="/cart" className={styles.iconCart}>
				{totalItems > 0 && <div className={styles.qty}>{totalItems}</div>}
				<ShoppingCartIcon />
			</Link>

			<div ref={ref} className={styles.icons_item} onClick={toggleDropdown}>
				<AccountIcon />
				{isDropdownVisible && (
					<div className={styles.dropdown}>
						<Link
							href="/account"
							onClick={() => {
								setActiveForm('account');
								setIsDropdownVisible(false);
							}}
							className={styles.accountModalItems}
						>
							My account
						</Link>
						<Link
							href="/account"
							onClick={() => {
								setActiveForm('orders');
								setIsDropdownVisible(false);
							}}
							className={styles.accountModalItems}
						>
							Orders
						</Link>
						<button
							onClick={() => {
								setIsDropdownVisible(false);
							}}
							className={`${styles.accountModalItems} ${styles.logOutBtn}`}
						>
							Log out
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default NavbarIconsLinks;
