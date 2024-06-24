'use client';

import Container from '../Container/Container';

import styles from './Header.module.scss';
import Burger from '@/components/Header/burger/Burger';
import NavbarIconsLinks from '@/components/Header/navbarIconsLinks/NavbarIconsLinks';
import NavbarLinks from '@/components/Header/navbarLinks/NavbarLinks';
import Logo from '@/components/Header/logo/Logo';
import useOutside from '@/hooks/useOutside';

export default function Header() {
  const { setIsShow, isShow, ref } = useOutside(false);
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <Burger isShow={isShow} setIsShow={setIsShow} ref={ref} />
          <Logo isShow={isShow} />
          <nav className={styles.navigation}>
            <div className={styles.navigation__links}>
              <NavbarLinks />
            </div>
            <NavbarIconsLinks />
          </nav>
        </div>
      </Container>
    </header>
  );
}
