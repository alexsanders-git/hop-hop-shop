import * as yup from 'yup';

export const categoryValid = (name: string) => {
	return yup
		.string()
		.matches(
			/^(?!['’ ]+$)[A-Za-z'’]+(?: [A-Za-z'’]+)*$/,
			`${name} is not valid`,
		)
		.required(`${name} is required`);
};
