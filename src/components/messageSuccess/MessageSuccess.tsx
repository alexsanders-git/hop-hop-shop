import styles from './styles.module.scss';

export interface IProps {
	text: string;
}

export default function MessageSuccess(props: IProps) {
	const { text = 'Success' } = props;
	return <div className={styles.container}>{text}</div>;
}
