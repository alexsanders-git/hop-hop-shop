import styles from './Container.module.scss';

interface IContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: IContainerProps) {
  return <div className={styles.container}>{children}</div>;
}
