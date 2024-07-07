'use client';

import Link from 'next/link';

import SearchBarWrapper from '@/components/Header/searchBarWrapper/SearchBarWrapper';
import useOutside from '@/hooks/useOutside';
import { useCart } from '@/store/cart/Cart.store';
import { useFavorite } from '@/store/favorite/Favorite.store';

import styles from './navbarIconsLinks.module.scss';
import AccountIcon from '../../../../public/headerImage/account.svg';
import LikeIcon from '../../../../public/headerImage/like.svg';
import ShoppingCartIcon from '../../../../public/headerImage/shopping-cart.svg';

function NavbarIconsLinks() {
	const { ref, setIsShow, isShow } = useOutside(false);
	const { cart } = useCart();
	const { favorites } = useFavorite();

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

			<Link href="/cart" className={`${styles.iconCart}`}>
				{cart.length > 0 && (
					<div className={styles.qty}>
						{cart.reduce((total, item) => total + item.quantity, 0)}
					</div>
				)}
				<ShoppingCartIcon />
			</Link>

			<button className={styles.icons_item}>
				<AccountIcon />
			</button>
		</div>
	);
}

export default NavbarIconsLinks;
