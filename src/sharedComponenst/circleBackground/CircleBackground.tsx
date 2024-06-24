import styles from './styles.module.scss';
import { ReactNode } from 'react';

export interface InterfaceCircleBackground {
  onclick: () => void;
  className?: string;
  children: ReactNode;
}

export default function CircleBackground({
  onclick,
  className = '',
  children
}: InterfaceCircleBackground) {
  return (
    <button className={`${styles.wrapper} ${className}`} onClick={onclick}>
      {children}
    </button>
  );
}
