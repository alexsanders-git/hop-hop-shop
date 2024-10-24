'use client';

import { useState } from 'react';
import styles from './styles.module.scss';
import MessageError from '@/components/messageError/MessageError';
import Loader from '@/components/Loader/Loader';
import MessageSuccess from '@/components/messageSuccess/MessageSuccess';
// import Pagination from '../pagination/Pagination';
import { robotoCondensed } from '@/styles/fonts/fonts';
// import EditButton from '../editButton/editButton';
// import RemoveButton from '../removeButton/RemoveButton';
// import { getMessageById, getMessagesDashboard } from '@/services/dashboard/messages/dashboard.product.service';

interface IProps {
	messages: IResponse<IMessages>;
}

interface IDashboardItem {
	item: IMessages;
	setNewData: (data: IResponse<IMessages>) => void;
	setError: (text: string | null) => void;
	setSuccess: (text: string | null) => void;
	setIsLoading: (isLoading: boolean) => void;
}

const PageSize = 10;
export default function DashboardTableMessages(props: IProps) {
	const { messages } = props;
	const [newData, setNewData] = useState<IResponse<IMessages>>(messages);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const header = [
		{ name: 'ID' },
		{ name: 'First Name' },
		{ name: 'Last Name' },
		{ name: 'E-mail' },
		{ name: 'Phone Number' },
		{ name: 'Actions' },
	];

	return (
		<>
			{error && <MessageError type={'dashboard'} text={error} />}
			{isLoading && <Loader />}
			{success && <MessageSuccess type={'dashboard'} text={success} />}
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<ul className={styles.responsiveTable}>
						{header.map((item, i) => (
							<div key={i} className={`${styles.col} ${styles[`col${i + 1}`]}`}>
								{item.name}
							</div>
						))}
						{newData.items.map((item, index: number) => (
							<DashboardItem
								item={item}
								setNewData={setNewData}
								key={index}
								setSuccess={setSuccess}
								setError={setError}
								setIsLoading={setIsLoading}
							/>
						))}
					</ul>
				</div>

				{/* {newData?.items_count > PageSize ? (
					<Pagination
						num_pages={newData?.pagination?.num_pages}
						currentPage={newData?.pagination?.current_page}
						totalCount={newData?.items_count}
						pageSize={PageSize}
						onPageChange={async (page) => {
							const res = await getMessagesDashboard();
							if (res.success) setNewData(res.data);
						}}
					/>
				) : null} */}
			</div>
		</>
	);
}

function DashboardItem(props: IDashboardItem) {
	const { setNewData, item, setSuccess, setError, setIsLoading } = props;

	return (
		<>
			<li className={`${styles.tableRow} ${robotoCondensed.className}`}>
				<div className={`${styles.col} ${styles.col1}`}>#{item.id}</div>
				<div className={`${styles.col} ${styles.col2}`}>{item.first_name}</div>
				<div className={`${styles.col} ${styles.col4}`}>{item.last_name}$</div>
				<div className={`${styles.col} ${styles.col4}`}>{item.email}$</div>
				<div className={`${styles.col} ${styles.col4}`}>{item.phone}$</div>
				<div className={`${styles.col} ${styles.col5}`}>
					{/* <EditButton callback={() => } />
					<RemoveButton callback={() => } /> */}
				</div>
			</li>
		</>
	);
}
