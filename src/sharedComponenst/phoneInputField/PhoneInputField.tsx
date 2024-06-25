import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import styles from './styles.module.scss';
import { FieldInputProps, FormikProps } from 'formik';

export interface InterfacePhoneInputField {
  field: FieldInputProps<string>;
  form: FormikProps<any>;
}

export default function PhoneInputField(props: InterfacePhoneInputField) {
  const { field, form, ...rest } = props;
  const inputClassName = `${styles.phoneInput} ${form.touched[field.name] && form.errors[field.name] ? styles.inputError : form.touched[field.name] ? styles.inputSuccess : ''}`;

  return (
    <div className={inputClassName}>
      <PhoneInput
        {...field}
        {...rest}
        value={field.value}
        onChange={(value) => form.setFieldValue(field.name, value)}
      />
    </div>
  );
}
