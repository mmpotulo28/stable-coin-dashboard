"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Button, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { CouponFormModal } from "@/components/coupons/CouponFormModal";
import { ConfirmModal } from "@/components/coupons/ConfirmModal";
import CouponCard from "@/components/coupons/coupon-card";
import {
	iCoupon,
	iCouponCreateRequest,
	iCouponUpdateRequest,
	useLiskCoupons,
} from "@mmpotulo/stablecoin-hooks";

export default function CouponsPage() {
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;

	const {
		coupons,
		couponsLoading,
		couponsError,
		fetchCoupons,

		createCoupon,
		createCouponError,
		createCouponLoading,
		createCouponMessage,

		updateCoupon,
		updateCouponError,
		updateCouponLoading,
		updateCouponMessage,

		claimCoupon,
		claimCouponError,
		claimCouponLoading,
		claimCouponMessage,

		deleteCoupon,
		deleteCouponError,
		deleteCouponLoading,
		deleteCouponMessage,
	} = useLiskCoupons({ apiKey: `Bearer ${apiKey}` });

	const { user } = useUser();

	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [editCoupon, setEditCoupon] = useState<iCoupon | null>(null);

	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [deleteCouponId, setDeleteCouponId] = useState<string | null>(null);

	const [isClaimOpen, setIsClaimOpen] = useState(false);
	const [claimCouponId, setClaimCouponId] = useState<string | null>(null);

	useEffect(() => {
		fetchCoupons();
	}, []);

	// Create
	const handleCreate = async (form: iCouponCreateRequest) => {
		if (!user?.id) return;
		await createCoupon(user.id, form);
	};

	// Edit
	const handleEdit = async (form: iCouponUpdateRequest) => {
		if (!user?.id || !editCoupon) return;
		await updateCoupon(user.id, editCoupon.id, form);
		setIsEditOpen(false);
		setEditCoupon(null);
	};

	// Delete
	const handleDelete = async () => {
		if (!user?.id || !deleteCouponId) return;
		await deleteCoupon(user.id, deleteCouponId);
		setIsDeleteOpen(false);
		setDeleteCouponId(null);
	};

	// Claim
	const handleClaim = async () => {
		if (!user?.id || !claimCouponId) return;
		await claimCoupon(user.id, claimCouponId);
		setIsClaimOpen(false);
		setClaimCouponId(null);
	};

	return (
		<div className="flex-1 overflow-auto p-6 space-y-8">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-semibold flex items-center gap-2">
					<Icon icon="lucide:ticket" />
					Coupons
				</h1>
				<Button
					color="primary"
					startContent={<Icon icon="lucide:plus" />}
					onPress={() => setIsCreateOpen(true)}>
					Create Coupon
				</Button>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<Icon icon="lucide:ticket" className="text-xl" />
						<span className="font-semibold">Available Coupons</span>
						<Button
							isIconOnly
							variant="light"
							size="sm"
							className="ml-2"
							aria-label="Refresh coupons"
							onPress={fetchCoupons}
							isDisabled={couponsLoading}>
							<Icon icon="lucide:refresh-cw" />
						</Button>
					</div>
				</CardHeader>
				<CardBody>
					{couponsLoading && (
						<div className="flex items-center gap-2 justify-center py-8">
							<Spinner label="Loading coupons..." />
						</div>
					)}
					{couponsError && (
						<div className="text-danger text-center py-8">{couponsError}</div>
					)}

					{createCouponError && (
						<div className="text-danger text-center py-8">{createCouponError}</div>
					)}

					{updateCouponError && (
						<div className="text-danger text-center py-8">{updateCouponError}</div>
					)}

					{claimCouponError && (
						<div className="text-danger text-center py-8">{claimCouponError}</div>
					)}

					{deleteCouponError && (
						<div className="text-danger text-center py-8">{deleteCouponError}</div>
					)}

					{!couponsLoading && coupons.length === 0 && (
						<div className="flex flex-col items-center justify-center py-8">
							<Icon icon="lucide:ticket" className="text-4xl text-default-400 mb-2" />
							<div className="text-default-500 font-medium">No coupons found.</div>
						</div>
					)}

					{!couponsLoading && coupons.length > 0 && (
						<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
							{coupons.map((coupon: iCoupon) => (
								<CouponCard
									key={coupon.id}
									coupon={coupon}
									setIsClaimOpen={setIsClaimOpen}
									setClaimCouponId={setClaimCouponId}
									setEditCoupon={setEditCoupon}
									setIsEditOpen={setIsEditOpen}
									setIsDeleteOpen={setIsDeleteOpen}
									setDeleteCouponId={setDeleteCouponId}
								/>
							))}
						</div>
					)}
				</CardBody>
			</Card>
			{/* Create Modal */}
			<CouponFormModal
				open={isCreateOpen}
				onClose={() => setIsCreateOpen(false)}
				onSubmit={handleCreate}
			/>
			{/* Edit Modal */}
			<CouponFormModal
				open={isEditOpen}
				onClose={() => {
					setIsEditOpen(false);
					setEditCoupon(null);
				}}
				onSubmit={handleEdit}
				initial={editCoupon || undefined}
				isEdit
			/>
			{/* Delete Modal */}
			<ConfirmModal
				open={isDeleteOpen}
				onClose={() => {
					setIsDeleteOpen(false);
					setDeleteCouponId(null);
				}}
				onConfirm={handleDelete}
				title="Delete Coupon"
				message="Are you sure you want to delete this coupon? This action cannot be undone."
				confirmText="Delete"
				color="danger"
			/>
			{/* Claim Modal */}
			<ConfirmModal
				open={isClaimOpen}
				onClose={() => {
					setIsClaimOpen(false);
					setClaimCouponId(null);
				}}
				onConfirm={handleClaim}
				title="Claim Coupon"
				message="Do you want to claim this coupon? This will credit it to your account."
				confirmText="Claim"
				color="primary"
			/>
		</div>
	);
}
