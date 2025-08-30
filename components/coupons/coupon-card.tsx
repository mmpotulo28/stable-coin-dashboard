import { useOrganization } from "@clerk/nextjs";
import { Button } from "@heroui/button";
import { Card, Chip, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { iCoupon, useLiskCoupons } from "@mmpotulo/stablecoin-hooks";

export interface iCouponCardProps {
	coupon: iCoupon;
	setIsClaimOpen: (value: boolean) => void;
	setClaimCouponId: (id: string) => void;
	setEditCoupon: (coupon: iCoupon) => void;
	setIsEditOpen: (value: boolean) => void;
	setIsDeleteOpen: (value: boolean) => void;
	setDeleteCouponId: (id: string) => void;
}

const CouponCard: React.FC<iCouponCardProps> = ({
	coupon,
	setIsClaimOpen,
	setClaimCouponId,
	setEditCoupon,
	setIsEditOpen,
	setIsDeleteOpen,
	setDeleteCouponId,
}) => {
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;

	const { couponsLoading, claimCouponLoading, deleteCouponLoading, updateCouponLoading } =
		useLiskCoupons({ apiKey: apiKey });

	return (
		<Card key={coupon.id} className="p-4 bg-default-100 shadow rounded-xl">
			<div className="flex items-center gap-2 mb-2">
				<Icon icon="lucide:ticket" className="text-xl text-primary" />
				<span className="font-semibold">{coupon.title}</span>
				<Chip color="secondary" variant="flat" className="ml-2">
					{coupon.code}
				</Chip>
			</div>
			<div className="text-default-500 text-sm mb-2">{coupon.description}</div>
			<div className="flex gap-2 text-xs text-default-400 mb-2">
				<span>Ref: {coupon.ref}</span>
				<span>Valid Until: {new Date(coupon.validUntil).toLocaleDateString()}</span>
			</div>
			<div className="flex gap-2 items-center mb-2">
				<Chip color="primary" variant="flat">
					Max: {coupon.maxCoupons}
				</Chip>
				<Chip color="success" variant="flat">
					Available: {coupon.availableCoupons}
				</Chip>
			</div>
			<Divider className="my-2" />
			<div className="flex gap-2">
				<Button
					size="sm"
					color="primary"
					onPress={() => {
						setIsClaimOpen(true);
						setClaimCouponId(coupon.id);
					}}
					isDisabled={
						couponsLoading || claimCouponLoading || coupon.availableCoupons < 1
					}>
					Claim
				</Button>
				<Button
					size="sm"
					variant="light"
					onPress={() => {
						setEditCoupon(coupon);
						setIsEditOpen(true);
					}}
					isDisabled={couponsLoading || updateCouponLoading}>
					Edit
				</Button>
				<Button
					size="sm"
					color="danger"
					variant="bordered"
					onPress={() => {
						setIsDeleteOpen(true);
						setDeleteCouponId(coupon.id);
					}}
					isDisabled={couponsLoading || deleteCouponLoading}>
					Delete
				</Button>
			</div>
		</Card>
	);
};

export default CouponCard;
