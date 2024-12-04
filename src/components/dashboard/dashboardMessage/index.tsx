'use client';

import Button from '@/components/Button/Button';
import styles from './styles.module.scss';
import { Field, Form, Formik, FormikProps } from 'formik';
import { sendQuickAnswer } from '@/services/dashboard/messages/dashboard.messages.service';

interface MessageDetailsProps {
	email: string;
}

const MessageDetails: React.FC<MessageDetailsProps> = ({ email }) => {
	const handleSendQuickAnswer = async (message: string) => {
		try {
			const response = await sendQuickAnswer({
				email,
				message,
			});
			console.log('Message sent successfully:', response);
		} catch (error) {
			console.error('Error sending message:', error);
		}
	};

	return (
		<Formik
			initialValues={{ quickAnswer: '' }}
			onSubmit={(values, { resetForm }) => {
				handleSendQuickAnswer(values.quickAnswer);
				resetForm();
			}}
		>
			{({
				handleReset,
				isValid,
				dirty,
				values,
				setFieldValue,
			}: FormikProps<{ quickAnswer: string }>) => {
				const maxCharacters = 1000;

				const handleInputChange = (
					e: React.ChangeEvent<HTMLTextAreaElement>,
				) => {
					const { value } = e.target;
					if (value.length <= maxCharacters) {
						setFieldValue('quickAnswer', value);
					}
				};

				return (
					<Form>
						<div className={styles.detailsWrapper}>
							<div className={styles.quickAnswerArea}>
								<Field
									as="textarea"
									id="quickAnswer"
									name="quickAnswer"
									placeholder="Quick Answer"
									value={values.quickAnswer}
									className={styles.quickAnswerInput}
									onChange={handleInputChange}
								/>
								<div className={styles.characterCounter}>
									{values.quickAnswer.length}/{maxCharacters}
								</div>
							</div>
						</div>
						<div className={styles.buttonsContainer}>
							<button
								type="button"
								className={styles.deleteButton}
								onClick={handleReset}
							>
								Clear all
							</button>
							<Button
								type="submit"
								className={styles.saveButton}
								text="Send Message"
								disabled={!(isValid && dirty)}
								onClick={() => console.log(123)}
							/>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};

export default MessageDetails;
