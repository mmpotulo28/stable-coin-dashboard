import React, { useState, useEffect } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Select,
	SelectItem,
	Spinner,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { iCharge, useLiskCharges } from "@mmpotulo/stablecoin-hooks";

export function UpdateChargeModal({
	isOpen,
	onClose,
	userId,
	charge,
	onUpdated,
}: {
	isOpen: boolean;
	onClose: () => void;
	userId: string;
	charge: iCharge | null;
	onUpdated?: () => void;
}) {
	const { user } = useUser();
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;
	const { updateCharge, chargesLoading, chargesError } = useLiskCharges({
		apiKey: `Bearer ${apiKey}`,
		user,
	});
	const [note, setNote] = useState("");
	const [status, setStatus] = useState<"PENDING" | "COMPLETE">("PENDING");

	useEffect(() => {
		setNote(charge?.note ?? "");
		setStatus(charge?.status ?? "PENDING");
	}, [charge, isOpen]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!charge) return;
		await updateCharge({
			userId,
			chargeId: charge.id,
			note,
			status,
		});
		if (onUpdated) onUpdated();
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className="max-w-lg mx-auto rounded-2xl shadow-2xl bg-default-50">
			<ModalContent>
				<ModalHeader className="flex items-center gap-3 pb-3 bg-default-50 rounded-t-2xl">
					<Icon icon="lucide:pencil" className="text-2xl text-primary" />
					<span className="text-lg font-semibold">Update Charge</span>
				</ModalHeader>
				<ModalBody>
					{charge ? (
						<form onSubmit={handleSubmit} className="space-y-6 py-3">
							<Input
								label="Note"
								value={note}
								onChange={(e) => setNote(e.target.value)}
								placeholder="Optional note"
							/>
							<Select
								label="Status"
								value={status}
								onChange={(e) =>
									setStatus(e.target.value as "PENDING" | "COMPLETE")
								}>
								<SelectItem key="PENDING">PENDING</SelectItem>
								<SelectItem key="COMPLETE">COMPLETE</SelectItem>
							</Select>
							{chargesError && (
								<div className="text-danger font-medium">{chargesError}</div>
							)}
						</form>
					) : (
						<div className="text-default-500">No charge selected.</div>
					)}
				</ModalBody>
				<ModalFooter className="flex justify-end pt-2">
					<Button
						onPress={onClose}
						variant="light"
						className="mr-2"
						isDisabled={chargesLoading}>
						Cancel
					</Button>
					<Button
						color="primary"
						type="submit"
						isLoading={chargesLoading}
						onClick={handleSubmit}
						isDisabled={chargesLoading || !charge}>
						{chargesLoading ? <Spinner size="sm" /> : "Update"}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
