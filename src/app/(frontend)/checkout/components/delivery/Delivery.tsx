'use client';
import styles from './styles.module.scss';
import { useRef, useState } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import Button from '@/components/Button/Button';
import Accordion from '@/app/(frontend)/checkout/components/accordion/Accordion';
import Input from '@/components/Input/Input';
import PencilIcon from '../../../../../../public/pencel.svg';
import dhl from '../../../../../../public/delivery/dhl.png';
import fedEx from '../../../../../../public/delivery/feedEx.png';
import united from '../../../../../../public/delivery/united.png';
import usp from '../../../../../../public/delivery/usp.png';
import tnt from '../../../../../../public/delivery/tnt.png';
import Image from 'next/image';
import ReadyData from '@/app/(frontend)/checkout/components/readyData/ReadyData';
import * as yup from 'yup';
import {
  cityValid,
  emailValid,
  nameValid,
  postalCodeValid
} from '@/validation/checkout/validation';

export interface InterfaceDelivery {}

export default function Delivery(props: InterfaceDelivery) {
  const {} = props;
  const [opened, setOpened] = useState(false);
  const ref = useRef<FormikProps<FormValues>>(null);

  const deliveryImages = [dhl, fedEx, united, usp, tnt];

  interface FormValues {
    country: string;
    city: string;
    postalCode: string;
    address: string;
  }

  return (
    <Formik
      innerRef={ref}
      validationSchema={yup
        .object({
          country: cityValid,
          city: cityValid,
          address: cityValid,
          postalCode: postalCodeValid
        })
        .required()}
      initialValues={{
        country: '',
        city: '',
        address: '',
        postalCode: ''
      }}
      onSubmit={async (values) => {
        alert(JSON.stringify(values));
        setOpened(true);
      }}
    >
      {({ isValid, dirty }) => (
        <Form>
          <Accordion title={'Delivery address'}>
            {!opened && (
              <div className={styles.inputWrapper}>
                <div className={styles.deliveryImages}>
                  {deliveryImages.map((img, index) => (
                    <Image
                      className={styles.deliveryImage}
                      key={index}
                      width={104}
                      height={56}
                      src={img}
                      alt="delivery-image"
                    />
                  ))}
                </div>
                <div className={styles.inputContainer}>
                  <Input
                    className={styles.input}
                    title={'Country'}
                    type={'text'}
                    name={'country'}
                    placeholder={'country'}
                  />
                  <Input
                    className={styles.input}
                    title={'City'}
                    type={'text'}
                    name={'city'}
                    placeholder={'city'}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Input
                    className={styles.input}
                    title={'Address'}
                    type={'text'}
                    name={'address'}
                    placeholder={'address'}
                  />
                  <Input
                    className={styles.input}
                    title={'Postal Code'}
                    type={'text'}
                    name={'postalCode'}
                    placeholder={'postal code'}
                  />
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
                firstText={ref?.current?.values.country}
                secondText={ref?.current?.values.city}
                thirdText={ref?.current?.values.address}
                fourText={ref?.current?.values.postalCode}
                setOpened={() => setOpened(!opened)}
              />
            )}
          </Accordion>
        </Form>
      )}
    </Formik>
  );
}
