import styles from './styles.module.scss';

export interface IProps {
	text: string;
}

export default function MessageError(props: IProps) {
	const { text = 'Error' } = props;
	return <div className={styles.container}>{text}</div>;
}
