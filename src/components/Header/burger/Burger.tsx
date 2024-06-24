import { forwardRef, Ref, useState } from 'react';
import styles from './Burger.module.scss';
import CloseIcon from '../../../../public/headerImage/close.svg';
import BurgerIcon from '../../../../public/headerImage/burger-menu.svg';
import SearchBarWrapper from '@/components/Header/searchBarWrapper/SearchBarWrapper';
import NavbarLinks from '@/components/Header/navbarLinks/NavbarLinks';

export interface InterfaceBurger {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
}

function Burger(props: InterfaceBurger, ref: Ref<HTMLDivElement>) {
  const { isShow, setIsShow } = props;
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };
  return (
    <>
      <div className={`${styles.icons_mobile} ${isShow && styles.opened}`}>
        <button
          className={`${styles.icons_item} ${isShow ? styles.searchBarOpen : ''}`}
          onClick={toggleBurgerMenu}
        >
          {isBurgerMenuOpen ? (
            <CloseIcon className={styles.closeIcon} />
          ) : (
            <BurgerIcon className={styles.burgerIcon} />
          )}
        </button>
        <SearchBarWrapper isShow={isShow} setIsShow={setIsShow} ref={ref} />
      </div>
      <div
        className={`${styles.burgerMenu} ${isBurgerMenuOpen ? styles.burgerMenuOpen : ''}`}
      >
        <NavbarLinks />
      </div>
    </>
  );
}

export default forwardRef(Burger);
