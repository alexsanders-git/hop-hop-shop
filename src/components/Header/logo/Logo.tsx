'use client';

import styles from './Logo.module.scss';
import Link from 'next/link';
import Image from 'next/image';

interface ILogo {
  isShow: boolean;
}

export default function Logo({ isShow }: ILogo) {
  return (
    <div className={`${styles.wrapper} ${isShow ? styles.hidden : ''}`}>
      <Link href="/">
        <Image
          src="/logo.svg"
          height={20}
          width={20}
          alt="logo"
          className={styles.image}
        />
      </Link>
    </div>
  );
}
