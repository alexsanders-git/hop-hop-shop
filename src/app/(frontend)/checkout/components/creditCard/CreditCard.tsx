import { londrinaSolid, robotoCondensed } from '@/styles/fonts/fonts';

import styles from './styles.module.scss';

export interface ICreditCard {
	setCardNumber: (value: string) => void;
	setCardName: (value: string) => void;
	setExpiryDate: (value: string) => void;
	setCvv: (value: string) => void;
	cardName: string;
	cardNumber: string;
	expiryDate: string;
	cvv: string;
	className: string;
}

function CreditCard(props: ICreditCard) {
	const {
		setCardNumber,
		setCardName,
		setCvv,
		setExpiryDate,
		cardNumber,
		cvv,
		expiryDate,
		cardName,
		className = '',
	} = props;
	const formatCardNumber = (value: string) => {
		const cleaned = value.replace(/\D+/g, ''); // Видалити всі нечислові символи
		const match = cleaned.match(/.{1,4}/g); // Розділити кожні 4 цифри
		return match ? match.join(' ') : '';
	};

	const formatCard = (value: string) => {
		return value.replace(/\D+/g, ''); // Видалити всі нечислові символи
	};

	const handleCardNumberChange = (e: { target: { value: string } }) => {
		const value = formatCardNumber(e.target.value);
		setCardNumber(value);
	};

	const handleCardNameChange = (e: { target: { value: string } }) => {
		setCardName(e.target.value);
	};

	const handleExpiryDateChange = (e: { target: { value: string } }) => {
		const value = formatCard(e.target.value);
		setExpiryDate(value);
	};

	const handleCvvChange = (e: { target: { value: string } }) => {
		const value = formatCard(e.target.value);
		setCvv(value);
	};

	return (
		<div
			className={`${styles.creditCard} ${robotoCondensed.className} ${className}`}
		>
			<div className={styles.cardName}>
				<span>Card Holder</span>
				<input
					name={'cardName'}
					type="text"
					value={cardName}
					onChange={handleCardNameChange}
					placeholder="Cardholder Name"
					className={londrinaSolid.className}
				/>
			</div>
			<div className={styles.cardNumber}>
				<span>Card Number</span>
				<input
					type="text"
					maxLength={19}
					value={cardNumber}
					onChange={handleCardNumberChange}
					placeholder="1234 1234 1234 1234"
				/>
			</div>
			<div className={styles.creditCardWrapper}>
				<div className={styles.expiryDate}>
					<span>Exp.Date</span>
					<input
						type="text"
						maxLength={4}
						value={expiryDate}
						onChange={handleExpiryDateChange}
						placeholder="MM/YY"
					/>
				</div>
				<div className={styles.cvv}>
					<span>Label</span>
					<input
						type="text"
						maxLength={3}
						value={cvv}
						onChange={handleCvvChange}
						placeholder="123"
					/>
				</div>
			</div>
		</div>
	);
}

export default CreditCard;
