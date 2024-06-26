'use client';

import styles from './navbarIconsLinks.module.scss';
import Link from 'next/link';
import LikeIcon from '../../../../public/headerImage/like.svg';
import ShoppingCartIcon from '../../../../public/headerImage/shopping-cart.svg';
import AccountIcon from '../../../../public/headerImage/account.svg';
import SearchBarWrapper from '@/components/Header/searchBarWrapper/SearchBarWrapper';
import useOutside from '@/hooks/useOutside';
import { useCart } from '@/store/cart/Cart.store';

function NavbarIconsLinks() {
  const { ref, setIsShow, isShow } = useOutside(false);
  const cart = useCart((state) => state.cart);
  return (
    <div className={styles.icons_list}>
      <div className={styles.icons_list__search}>
        <SearchBarWrapper isShow={isShow} setIsShow={setIsShow} ref={ref} />
      </div>
      <Link href="" className={styles.icons_item}>
        <LikeIcon />
      </Link>
      <Link href="/shopping-cart" className={`${styles.iconCart}`}>
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
