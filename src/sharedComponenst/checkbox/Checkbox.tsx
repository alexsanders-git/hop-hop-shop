import styles from './styles.module.scss';
import { useState } from 'react';

export interface ICheckbox {
  label: string;
  type?: 'rounded' | 'square';
  className?: string;
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
}

export default function Checkbox(props: ICheckbox) {
  const {
    isChecked,
    setIsChecked,
    label,
    type = 'rounded',
    className = ''
  } = props;
  return (
    <div
      onClick={() => {
        setIsChecked(!isChecked);
      }}
      className={`${styles.wrapper} ${className}`}
    >
      <div
        className={`${styles.checkbox} ${type === 'square' && styles.square}`}
      >
        {isChecked && <div className={styles.background}></div>}
      </div>
      <div className={styles.text}>{label}</div>
    </div>
  );
}
