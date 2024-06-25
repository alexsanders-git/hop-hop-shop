import styles from './styles.module.scss';
import Image from 'next/image';

export interface InterfaceReadyData {
  firstText?: string;
  secondText?: string;
  thirdText?: string;
  fourText?: string;
  fiveText?: string;
  setOpened: () => void;
}

export default function ReadyData(props: InterfaceReadyData) {
  const { firstText, fourText, thirdText, secondText, fiveText, setOpened } =
    props;
  return (
    <div className={styles.readyData}>
      <div className={styles.userInfo}>
        {firstText && <span>{firstText}</span>}
        {secondText && <span>{secondText}</span>}
        {thirdText && <span>{thirdText}</span>}
        {fourText && <span>{fourText}</span>}
        {fiveText && <span>{fiveText}</span>}
      </div>
      <div onClick={() => setOpened()} className={styles.imgWrapper}>
        <Image
          className={styles.img}
          width={32}
          height={32}
          src={'/pencel.svg'}
          alt={'pencel.svg'}
        />
      </div>
    </div>
  );
}
