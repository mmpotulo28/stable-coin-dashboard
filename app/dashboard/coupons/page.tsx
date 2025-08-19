"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Button, Chip, Spinner, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useCoupons } from "@/hooks/useCoupons";
import { ICoupon, ICouponCreateRequest, ICouponUpdateRequest } from "@/types/users";
import { useUser } from "@clerk/nextjs";
import { CouponFormModal } from "@/components/coupons/CouponFormModal";
import { ConfirmModal } from "@/components/coupons/ConfirmModal";
import CouponCard from "@/components/coupons/coupon-card";

export default function CouponsPage() {
	const {
		coupons,
		loading,
		error,
		fetchCoupons,
		createCoupon,
		updateCoupon,
		claimCoupon,
		deleteCoupon,
	} = useCoupons();
	const { user } = useUser();

	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [editCoupon, setEditCoupon] = useState<ICoupon | null>(null);

	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [deleteCouponId, setDeleteCouponId] = useState<string | null>(null);

	const [isClaimOpen, setIsClaimOpen] = useState(false);
	const [claimCouponId, setClaimCouponId] = useState<string | null>(null);

	const [actionLoading, setActionLoading] = useState(false);
	const [actionMsg, setActionMsg] = useState<string | null>(null);

	useEffect(() => {
		fetchCoupons();
	}, []);

	useEffect(() => {
		if (actionMsg) {
			const timer = setTimeout(() => setActionMsg(null), 3000);
			return () => clearTimeout(timer);
		}
	}, [actionMsg]);

	// Create
	const handleCreate = async (form: ICouponCreateRequest) => {
		if (!user?.id) return;
		setActionLoading(true);
		setActionMsg(null);
		try {
			await createCoupon(user.id, form);
			setIsCreateOpen(false);
			setActionMsg("Coupon created successfully.");
		} catch {
			setActionMsg("Failed to create coupon.");
		} finally {
			setActionLoading(false);
		}
	};

	// Edit
	const handleEdit = async (form: ICouponUpdateRequest) => {
		if (!user?.id || !editCoupon) return;
		setActionLoading(true);
		setActionMsg(null);
		try {
			await updateCoupon(user.id, editCoupon.id, form);
			setIsEditOpen(false);
			setEditCoupon(null);
			setActionMsg("Coupon updated successfully.");
		} catch {
			setActionMsg("Failed to update coupon.");
		} finally {
			setActionLoading(false);
		}
	};

	// Delete
	const handleDelete = async () => {
		if (!user?.id || !deleteCouponId) return;
		setActionLoading(true);
		setActionMsg(null);
		try {
			await deleteCoupon(user.id, deleteCouponId);
			setIsDeleteOpen(false);
			setDeleteCouponId(null);
			setActionMsg("Coupon deleted successfully.");
		} catch {
			setActionMsg("Failed to delete coupon.");
		} finally {
			setActionLoading(false);
		}
	};

	// Claim
	const handleClaim = async () => {
		if (!user?.id || !claimCouponId) return;
		setActionLoading(true);
		setActionMsg(null);
		try {
			await claimCoupon(user.id, claimCouponId);
			setIsClaimOpen(false);
			setClaimCouponId(null);
			setActionMsg("Coupon claimed successfully.");
		} catch {
			setActionMsg("Failed to claim coupon.");
		} finally {
			setActionLoading(false);
		}
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
			{actionMsg && <div className="text-success text-center mb-4">{actionMsg}</div>}
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
							isDisabled={loading}>
							<Icon icon="lucide:refresh-cw" />
						</Button>
					</div>
				</CardHeader>
				<CardBody>
					{loading ? (
						<div className="flex items-center gap-2 justify-center py-8">
							<Spinner label="Loading coupons..." />
						</div>
					) : error ? (
						<div className="text-danger text-center py-8">{error}</div>
					) : coupons.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-8">
							<Icon icon="lucide:ticket" className="text-4xl text-default-400 mb-2" />
							<div className="text-default-500 font-medium">No coupons found.</div>
						</div>
					) : (
						<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
							{coupons.map((coupon: ICoupon) => (
								<CouponCard
									key={coupon.id}
									coupon={coupon}
									actionLoading={actionLoading}
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
				loading={actionLoading}
			/>
			{/* Edit Modal */}
			<CouponFormModal
				open={isEditOpen}
				onClose={() => {
					setIsEditOpen(false);
					setEditCoupon(null);
				}}
				onSubmit={handleEdit}
				loading={actionLoading}
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
				loading={actionLoading}
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
				loading={actionLoading}
				confirmText="Claim"
				color="primary"
			/>
		</div>
	);
}
