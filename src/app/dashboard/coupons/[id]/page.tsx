import { notFound } from 'next/navigation';

import { getCouponById } from '@/services/dashboard/coupons/dashboard.coupons.service';
import EditCoupon from '@/template/editCoupon/EditCoupon';
import { isValid } from '@/utils/func/isValid';

type Props = {
	params: {
		id: string;
	};
};

export default async function DashboardCategoriesId({ params: { id } }: Props) {
	const coupon = await getCouponById(id);

	if (!isValid<ICoupon>(coupon)) {
		return notFound();
	}
	return <EditCoupon coupon={coupon} />;
}
