'use client';
import styles from './styles.module.scss';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { Form, Formik, FormikProps } from 'formik';
import Accordion from '@/app/(frontend)/checkout/components/accordion/Accordion';
import { useRef, useState } from 'react';
import Image from 'next/image';

export interface InterfacePersonalData {}

export default function PersonalData(props: InterfacePersonalData) {
  const [opened, setOpened] = useState(false);
  const ref = useRef<FormikProps<FormValues>>(null);

  interface FormValues {
    name: string;
    lastname: string;
    email: string;
    number: string;
  }

  const {} = props;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Formik
          innerRef={ref}
          initialValues={{
            name: '',
            lastname: '',
            email: '',
            number: ''
          }}
          onSubmit={async (values) => {
            alert(JSON.stringify(values));
            setOpened(true);
          }}
        >
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
                    <Input
                      className={styles.input}
                      title={'Phone number'}
                      type={'number'}
                      name={'number'}
                      placeholder={'phoneNumber'}
                    />
                  </div>
                  <Button
                    className={styles.button}
                    onClick={() => {}}
                    disabled={false}
                    style={'secondary'}
                    text={'Next'}
                    type="submit"
                  />
                </div>
              )}
              {opened && (
                <div className={styles.readyData}>
                  <div className={styles.userInfo}>
                    <span className={styles.name}>
                      {ref?.current?.values.name}
                    </span>
                    <span className={styles.lastname}>
                      {ref?.current?.values.lastname}
                    </span>
                    <span className={styles.email}>
                      {ref?.current?.values.email}
                    </span>
                    <span className={styles.number}>
                      {ref?.current?.values.number}
                    </span>
                  </div>
                  <div
                    onClick={() => setOpened(!opened)}
                    className={styles.imgWrapper}
                  >
                    <Image
                      className={styles.img}
                      width={32}
                      height={32}
                      src={'/pencel.svg'}
                      alt={'asdas'}
                    />
                  </div>
                </div>
              )}
            </Accordion>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
