'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/Button/Button';
import styles from './styles.module.scss';
import { getMessageDashboardClient } from '@/services/dashboard/messages/dashboard.messages.service';

interface IMessageProps {
	params: {
		id: number;
	};
}

export default function MessageDetails(props: IMessageProps) {
	const { params } = props;
	const [message, setMessage] = useState<IMessages | null>(null);
	const [quickAnswer, setQuickAnswer] = useState<string>('');
	const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setQuickAnswer(e.target.value);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchContactsData = await getMessageDashboardClient(params.id);
				if (fetchContactsData.success) {
					setMessage(fetchContactsData.data);
				} else {
					console.error('Failed to fetch message');
				}
			} catch (error) {
				console.error('Error fetching message:', error);
			}
		};
		fetchData();
	}, [params.id]);

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.titleWrapper}>
				<h1 className={styles.title}>Message</h1>
				<p className={styles.orderId}>{`# ${message?.id || 'undefined'}`}</p>
			</div>
			<div className={styles.userDetails}>
				<div className={styles.detailsWrapper}>
					<p className={styles.detailsLabel}>First Name</p>
					<p className={styles.details}>{message?.first_name || 'undefined'}</p>
				</div>
				<div className={styles.detailsWrapper}>
					<p className={styles.detailsLabel}>Last Name</p>
					<p className={styles.details}>{message?.last_name || 'undefined'}</p>
				</div>
				<div className={styles.detailsWrapper}>
					<p className={styles.detailsLabel}>E-Mail</p>
					<a href={`mailto:${message?.email}`} className={styles.details}>
						{message?.email || 'undefined'}
					</a>
				</div>
				<div className={styles.detailsWrapper}>
					<p className={styles.detailsLabel}>Phone Number</p>
					<a href={`tel:${message?.phone}`} className={styles.details}>
						{message?.phone || 'undefined'}
					</a>
				</div>
			</div>
			<div className={styles.detailsWrapper}>
				<p className={styles.detailsLabel}>Message Text</p>
				<p className={styles.messageWrapper}>
					{message?.message || 'undefined'}
				</p>
			</div>
			<div className={styles.detailsWrapper}>
				<label htmlFor="quickAnswer" className={styles.detailsLabel}>
					Quick Answer
				</label>
				<textarea
					id="quickAnswer"
					placeholder={'Quick Answer'}
					value={quickAnswer}
					onChange={handleAnswerChange}
					className={styles.quickAnswerArea}
				/>
			</div>
			<div className={styles.buttonsContainer}>
				<button
					type="button"
					className={styles.deleteButton}
					onClick={() => setQuickAnswer('')}
				>
					Clear all
				</button>
				<Button
					type="submit"
					className={styles.saveButton}
					text="Send Message"
					onClick={() => {
						console.log(quickAnswer);
						setQuickAnswer('');
					}}
				/>
			</div>
		</div>
	);
}
