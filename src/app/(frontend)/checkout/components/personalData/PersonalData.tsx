'use client';
import styles from './styles.module.scss';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import Accordion from '@/app/(frontend)/checkout/components/accordion/Accordion';
import { useRef, useState } from 'react';
import ReadyData from '@/app/(frontend)/checkout/components/readyData/ReadyData';
import * as yup from 'yup';
import {
  emailValid,
  nameValid,
  phoneValid
} from '@/validation/checkout/validation';
import { robotoCondensed } from '@/styles/fonts/fonts';
import PhoneInputField from '@/sharedComponenst/phoneInputField/PhoneInputField';

export interface IPersonalData {}

export default function PersonalData(props: IPersonalData) {
  const {} = props;
  const [opened, setOpened] = useState(false);
  const ref = useRef<FormikProps<FormValues>>(null);

  interface FormValues {
    name: string;
    lastname: string;
    email: string;
    phone: string;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Formik
          validationSchema={yup
            .object({
              name: nameValid,
              lastname: nameValid,
              email: emailValid,
              phone: phoneValid
            })
            .required()}
          innerRef={ref}
          initialValues={{
            name: '',
            lastname: '',
            email: '',
            phone: ''
          }}
          onSubmit={async (values) => {
            alert(JSON.stringify(values));
            setOpened(true);
          }}
        >
          {({ isValid, dirty }) => (
            <Form>
              <Accordion title={'Personal data'}>
                {!opened && (
                  <div className={styles.inputWrapper}>
                    <div className={styles.inputContainer}>
                      <Input
                        className={styles.input}
                        title={'First name'}
                        type={'text'}
                        name={'name'}
                        placeholder={'name'}
                      />
                      <Input
                        className={styles.input}
                        title={'Last name'}
                        type={'text'}
                        name={'lastname'}
                        placeholder={'lastname'}
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <Input
                        className={styles.input}
                        title={'Email'}
                        type={'email'}
                        name={'email'}
                        placeholder={'email'}
                      />
                      <div className={styles.phoneInputWrapper}>
                        <label
                          className={`${styles.phoneInputText} ${robotoCondensed.className}`}
                          htmlFor="phone"
                        >
                          Phone Number
                        </label>
                        <Field
                          name="phone"
                          placeholder={'+38 066 666 66 66'}
                          component={PhoneInputField}
                        />
                        <ErrorMessage
                          className={styles.error}
                          name="phone"
                          component="div"
                        />
                      </div>
                    </div>
                    <Button
                      className={styles.button}
                      disabled={!(isValid && dirty)}
                      style={'secondary'}
                      text={'Next'}
                      type="submit"
                    />
                  </div>
                )}
                {opened && (
                  <ReadyData
                    setOpened={() => setOpened(!opened)}
                    firstText={ref?.current?.values.name}
                    secondText={ref?.current?.values.lastname}
                    thirdText={ref?.current?.values.email}
                    fourText={ref?.current?.values.phone}
                  />
                )}
              </Accordion>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
