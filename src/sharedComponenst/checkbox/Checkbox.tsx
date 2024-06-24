import styles from './styles.module.scss';
import { useState } from 'react';

export interface InterfaceCheckbox {
  label: string;
  type?: 'rounded' | 'square';
  className?: string;
}

export default function Checkbox(props: InterfaceCheckbox) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { label, type = 'rounded', className = '' } = props;
  return (
    <div
      onClick={() => setIsChecked(!isChecked)}
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
