import * as yup from 'yup';

export const AppErrors = {
	RequiredField: 'Required',
	InvalidEmail: 'Invalid Email',
	InvalidPhone: 'Incorrect phone format',
	minLengthName: 'Be at least 2 characters long',
	minLengthPassword: 'Be at least 8 characters long',
	maxLengthName: 'Length no more than 50 characters',
	maxLengthEmail: 'Length no more than 256 characters',
	Spaces: 'Spaces are not allowed',
	onlyLetters: 'Only letters',
	onlyLettersOrNum: 'Only numbers and letters',
	passwordLowLetter: 'The password must retain one lowercase letters',
	passwordUpLetter: 'The password must retain one uppercase letters',
	passwordNum: 'Include at least one numerical digit (0-9)',
	passwordChar:
		'Include at least one special character (!, @, #, $, %, *, ?, &)',
	InvalidPassword: 'Invalid password',
};

export const nameValid = yup
	.string()
	.required(AppErrors.RequiredField)
	.min(2, AppErrors.minLengthName)
	.max(50, AppErrors.maxLengthName)
	.matches(/^[^\s]+$/, AppErrors.Spaces)
	.matches(/^\p{L}+$/u, AppErrors.onlyLetters);

export const emailValid = yup
	.string()
	.required(AppErrors.RequiredField)
	.max(256, AppErrors.maxLengthEmail)
	.matches(
		/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
		AppErrors.InvalidEmail,
	);

export const phoneValid1 = yup
	.string()
	.required(AppErrors.RequiredField)
	.matches(
		/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12}(\s*)?$/,
		AppErrors.InvalidPhone,
	);

export const cityValid = yup
	.string()
	.required(AppErrors.RequiredField)
	.matches(/^\p{L}+$/u, AppErrors.onlyLetters);

export const postalCodeValid = yup.number();

export const phoneValid = yup.string().required('Phone number is required');
