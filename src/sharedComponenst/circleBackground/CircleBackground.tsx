import styles from './styles.module.scss';
import { ReactNode } from 'react';

export interface ICircleBackground {
  onclick: () => void;
  className?: string;
  children: ReactNode;
}

export default function CircleBackground({
  onclick,
  className = '',
  children
}: ICircleBackground) {
  return (
    <button className={`${styles.wrapper} ${className}`} onClick={onclick}>
      {children}
    </button>
  );
}
