import styles from './styles.module.scss';
import LikeIcon from '../../../public/like.svg';
import { useLike } from '@/store/wishlist/Wishlist.store';

export interface ILike {
  className?: string;
  id: number;
}

export default function Like({ id, className = '' }: ILike) {
  const likes = useLike((state) => state.likes);
  const existingProduct = likes.find((p) => p.id === id);
  return (
    <span
      className={`${styles.likeImage} ${className} ${existingProduct && styles.active}`}
    >
      <LikeIcon />
    </span>
  );
}
