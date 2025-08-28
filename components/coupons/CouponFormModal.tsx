import React, { useEffect, useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	Button,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useOrganization } from "@clerk/nextjs";
import { iCouponCreateRequest, useLiskCoupons } from "@mmpotulo/stablecoin-hooks";

function generateCouponRef(length = 16) {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return `ref_${result}`;
}

export function CouponFormModal({
	open,
	onClose,
	onSubmit,
	initial,
	isEdit,
}: {
	open: boolean;
	onClose: () => void;
	onSubmit: (form: iCouponCreateRequest) => void;
	initial?: Partial<iCouponCreateRequest>;
	isEdit?: boolean;
}) {
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;
	const { createCoupon, createCouponError, createCouponLoading, createCouponMessage } =
		useLiskCoupons({ apiKey: `Bearer ${apiKey}` });

	const [form, setForm] = useState<iCouponCreateRequest>({
		title: initial?.title || "",
		imageUrl: initial?.imageUrl || "",
		description: initial?.description || "",
		code: initial?.code || "",
		ref: initial?.ref || "",
		validUntil: initial?.validUntil || "",
		maxCoupons: initial?.maxCoupons || 1,
		availableCoupons: initial?.availableCoupons || 1,
	});

	useEffect(() => {
		if (open) {
			setForm({
				title: initial?.title || "",
				imageUrl: initial?.imageUrl || "",
				description: initial?.description || "",
				code: initial?.code || "",
				ref: initial?.ref || "",
				validUntil: initial?.validUntil || "",
				maxCoupons: initial?.maxCoupons || 1,
				availableCoupons: initial?.availableCoupons || 1,
			});
		}
	}, [open, initial]);

	return (
		<Modal isOpen={open} onClose={onClose} className="max-w-lg mx-auto">
			<ModalContent>
				<ModalHeader>{isEdit ? "Edit Coupon" : "Create Coupon"}</ModalHeader>
				<ModalBody>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							onSubmit(form);
						}}
						className="flex flex-col gap-4">
						<Input
							label="Title"
							value={form.title}
							onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
							isRequired
						/>
						<Input
							label="Description"
							value={form.description}
							onChange={(e) =>
								setForm((f) => ({ ...f, description: e.target.value }))
							}
							isRequired
						/>
						<Input
							label="Code"
							value={form.code}
							onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
							isRequired
						/>
						<div className="flex gap-2 items-center">
							<Input
								label="Ref"
								value={form.ref}
								onChange={(e) => setForm((f) => ({ ...f, ref: e.target.value }))}
								isRequired
							/>
							<Button
								size="lg"
								isIconOnly
								type="button"
								variant="bordered"
								color="secondary"
								onPress={() => setForm((f) => ({ ...f, ref: generateCouponRef() }))}
								className="my-auto min-h-full">
								<Icon icon="lucide:refresh-cw" />
							</Button>
						</div>
						<Input
							label="Valid Until"
							type="datetime-local"
							value={form.validUntil ? form.validUntil.slice(0, 16) : ""}
							onChange={(e) => setForm((f) => ({ ...f, validUntil: e.target.value }))}
							isRequired
						/>
						<Input
							label="Max Coupons"
							type="number"
							min={1}
							value={form.maxCoupons?.toString()}
							onChange={(e) =>
								setForm((f) => ({
									...f,
									maxCoupons: Number(e.target.value),
								}))
							}
							isRequired
						/>
						<Input
							label="Available Coupons"
							type="number"
							min={0}
							value={form.availableCoupons?.toString()}
							onChange={(e) =>
								setForm((f) => ({
									...f,
									availableCoupons: Number(e.target.value),
								}))
							}
							isRequired
						/>
						<Input
							label="Image URL"
							value={form.imageUrl || ""}
							onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
							isRequired
						/>
						<Button
							color="primary"
							type="submit"
							isLoading={createCouponLoading}
							isDisabled={
								createCouponLoading ||
								!form.title ||
								!form.description ||
								!form.code ||
								!form.ref ||
								!form.validUntil ||
								!form.maxCoupons ||
								form.availableCoupons < 0 ||
								!form.imageUrl
							}>
							{isEdit ? "Update Coupon" : "Create Coupon"}
						</Button>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button variant="light" onPress={onClose}>
						Cancel
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
