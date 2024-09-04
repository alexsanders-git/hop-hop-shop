import { ChangeEvent, useState } from 'react';

import { londrinaSolid, robotoCondensed } from '@/styles/fonts/fonts';
import CreditCardDetector from '@/utils/CreditCardDetector';

import styles from './styles.module.scss';

function CreditCard(props: { className: string; formik: any }) {
	const { className = '', formik } = props;
	const [maxDigits, setMaxDigits] = useState(19); // Встановлення початкового максимального ліміту

	const formatCardNumber = (value: string) => {
		const cleaned = value.replace(/\D+/g, ''); // Видалити всі нечислові символи
		const match = cleaned.match(/.{1,4}/g); // Розділити кожні 4 цифри
		return match ? match.join(' ') : '';
	};

	const handleCustomChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		let formattedValue = value;

		if (name === 'cardNumber') {
			const cleanedValue = value.replace(/\D+/g, ''); // Видалити всі нечислові символи
			const cardInfo = CreditCardDetector.getInfo(cleanedValue.slice(0, 4)); // Визначити тип картки за першими 4 цифрами

			// Оновлення maxDigits на основі типу картки
			if (cardInfo.type !== 'unknown') {
				const totalDigits = cardInfo.blocks.reduce(
					(sum: number, block: number) => sum + block,
					0,
				);
				setMaxDigits(totalDigits);
				console.log('maxDigits', totalDigits);
			}

			if (cleanedValue.length <= maxDigits) {
				formattedValue = formatCardNumber(cleanedValue);
			} else {
				formattedValue = formatCardNumber(cleanedValue.slice(0, maxDigits));
			}
		} else if (name === 'expiryDate') {
			formattedValue = value.replace(/\D+/g, ''); // Видалити всі нечислові символи
			if (formattedValue.length === 2) {
				formattedValue = formattedValue + '/';
			} else if (formattedValue.length > 2) {
				formattedValue =
					formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
			}
		} else if (name === 'cvv') {
			formattedValue = value.replace(/\D+/g, ''); // Видалити всі нечислові символи
		}

		formik.setFieldValue(name, formattedValue);
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<div
				className={`${styles.creditCard} ${robotoCondensed.className} ${className}`}
			>
				<div
					className={`${styles.cardName} ${formik.touched.cardName && styles.toched} ${formik.touched.cardName && formik.errors.cardName && styles.error}`}
				>
					<span>Card Holder</span>
					<input
						name="cardName"
						type="text"
						placeholder="Cardholder Name"
						className={londrinaSolid.className}
						onChange={handleCustomChange}
						onBlur={formik.handleBlur}
						value={formik.values.cardName}
					/>
					{formik.touched.cardName && formik.errors.cardName ? (
						<div className={styles.errorBlock}>{formik.errors.cardName}</div>
					) : null}
				</div>
				<div
					className={`${styles.cardNumber} ${formik.touched.cardNumber && styles.toched} ${formik.touched.cardNumber && formik.errors.cardNumber && styles.error}`}
				>
					<span>Card Number</span>
					<input
						name="cardNumber"
						type="text"
						maxLength={maxDigits + Math.floor(maxDigits / 4)} // Динамічне обмеження maxLength з урахуванням пробілів
						placeholder="1234 1234 1234 1234"
						onChange={handleCustomChange}
						onBlur={formik.handleBlur}
						value={formik.values.cardNumber}
					/>
					{formik.touched.cardNumber && formik.errors.cardNumber ? (
						<div className={styles.errorBlock}>{formik.errors.cardNumber}</div>
					) : null}
				</div>
				<div className={`${styles.creditCardWrapper}`}>
					<div
						className={`${styles.expiryDate} ${formik.touched.expiryDate && styles.toched} ${formik.touched.expiryDate && formik.errors.expiryDate && styles.error}`}
					>
						<span>Exp.Date</span>
						<input
							name="expiryDate"
							type="text"
							maxLength={5}
							placeholder="MM/YY"
							onChange={handleCustomChange}
							onBlur={formik.handleBlur}
							value={formik.values.expiryDate}
						/>
						{formik.touched.expiryDate && formik.errors.expiryDate ? (
							<div className={styles.errorBlock}>
								{formik.errors.expiryDate}
							</div>
						) : null}
					</div>
					<div
						className={`${styles.cvv} ${formik.touched.cvv && styles.toched} ${formik.touched.cvv && formik.errors.cvv && styles.error}`}
					>
						<span>CVV</span>
						<input
							name="cvv"
							type="text"
							maxLength={4}
							placeholder="123"
							onChange={handleCustomChange}
							onBlur={formik.handleBlur}
							value={formik.values.cvv}
						/>
						{formik.touched.cvv && formik.errors.cvv ? (
							<div className={styles.errorBlock}>{formik.errors.cvv}</div>
						) : null}
					</div>
				</div>
			</div>
		</form>
	);
}

export default CreditCard;
