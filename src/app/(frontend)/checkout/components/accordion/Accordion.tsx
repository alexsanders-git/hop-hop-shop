'use client';
import styles from './styles.module.scss';
import { ReactNode, useState } from 'react';
import ArrowTop from '../../../../../../public/arrowTop.svg';

export interface InterfaceAccordion {
  title: string;
  children: ReactNode;
}

export default function Accordion(props: InterfaceAccordion) {
  const [active, setActive] = useState(false);
  const { title, children } = props;
  return (
    <div className={`${styles.container} ${active && styles.active}`}>
      <div
        onClick={() => setActive(!active)}
        className={`${styles.head} ${active && styles.activeHead}`}
      >
        <span className={styles.title}>{title}</span>
        <ArrowTop className={`${styles.img} ${active && styles.rotate}`} />
      </div>
      {active && <div className={styles.body}>{children}</div>}
    </div>
  );
}
