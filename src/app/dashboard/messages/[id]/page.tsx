import MessageDetails from '@/components/dashboard/dashboardMessage';
import styles from './styles.module.scss';

interface IMessageProps {
	params: {
		id: number;
	};
}

export default function MessageDetailsPage(props: IMessageProps) {
	const { params } = props;
	return (
		<>
			<MessageDetails id={params.id} />
		</>
	);
}
