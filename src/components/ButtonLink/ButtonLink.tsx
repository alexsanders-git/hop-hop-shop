import Link from 'next/link';

import styles from './ButtonLink.module.scss';

interface IButtonLinkProps {
  href: string;
  text: string;
}

export default function ButtonLink({ href, text }: IButtonLinkProps) {
  return (
    <Link href={href} className={styles.button}>
      {text}
    </Link>
  );
}
