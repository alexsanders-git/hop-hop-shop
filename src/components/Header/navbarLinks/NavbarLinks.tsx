'use client';

import styles from './NavbarLinks.module.scss';
import Link from 'next/link';

export default function NavbarLinks() {
  return (
    <ul className={styles.nav}>
      <Link href="#" className={styles.nav_link}>
        XXXXXXX
      </Link>
      <Link href="#" className={styles.nav_link}>
        PRODUCT
      </Link>
      <Link href="#" className={styles.nav_link}>
        XXXXXXX
      </Link>
    </ul>
  );
}
