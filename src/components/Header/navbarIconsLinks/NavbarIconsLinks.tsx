'use client';

import { Heart, ShoppingCart, UserRound } from 'lucide-react';
import Link from 'next/link';

import SearchBarWrapper from '@/components/Header/searchBarWrapper/SearchBarWrapper';
import useOutside from '@/hooks/useOutside';
import { useCart } from '@/store/cart/Cart.store';
import { useFavorite } from '@/store/favorite/Favorite.store';

import styles from './navbarIconsLinks.module.scss';

function NavbarIconsLinks() {
	const { ref, setIsShow, isShow } = useOutside(false);
	const { favorites } = useFavorite();
	const totalItems = useCart((state) => state.cart?.total_items || 0);

	return (
		<div className={styles.icons_list}>
			<div className={styles.icons_list__search}>
				<SearchBarWrapper isShow={isShow} setIsShow={setIsShow} ref={ref} />
			</div>

			<Link href="/favorites" className={styles.icons_item}>
				{favorites.length > 0 && (
					<div className={styles.qty}>{favorites.length}</div>
				)}
				<Heart />
			</Link>

			<Link href="/cart" className={styles.icons_item}>
				{totalItems > 0 && <div className={styles.qty}>{totalItems}</div>}
				<ShoppingCart />
			</Link>

			<Link href="/dashboard/account" className={styles.icons_item}>
				<UserRound />
			</Link>
		</div>
	);
}

export default NavbarIconsLinks;
