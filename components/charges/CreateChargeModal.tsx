import React, { useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Spinner,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLiskCharges } from "@/hooks/useLiskCharges";

export function CreateChargeModal({
	isOpen,
	onClose,
	userId,
}: {
	isOpen: boolean;
	onClose: () => void;
	userId: string;
}) {
	const { createCharge, createLoading, createError, createdCharge } = useLiskCharges();
	const [paymentId, setPaymentId] = useState("");
	const [amount, setAmount] = useState("");
	const [note, setNote] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await createCharge({
			userId,
			paymentId,
			amount: Number(amount),
			note,
		});
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className="max-w-lg mx-auto rounded-2xl shadow-2xl bg-default-50">
			<ModalContent>
				<ModalHeader className="flex items-center gap-3 pb-3 bg-default-50 rounded-t-2xl">
					<Icon icon="lucide:link" className="text-2xl text-primary" />
					<span className="text-lg font-semibold">Create Charge</span>
				</ModalHeader>
				<ModalBody>
					<form onSubmit={handleSubmit} className="space-y-6 py-3">
						<Input
							label="Payment ID"
							value={paymentId}
							onChange={(e) => setPaymentId(e.target.value)}
							placeholder="Unique payment identifier"
							isRequired
						/>
						<Input
							label="Amount"
							type="number"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							placeholder="Amount to charge"
							isRequired
						/>
						<Input
							label="Note (optional)"
							value={note}
							onChange={(e) => setNote(e.target.value)}
							placeholder="Optional note"
						/>
						{createError && (
							<div className="text-danger font-medium">{createError}</div>
						)}
						{createdCharge && (
							<div className="space-y-2">
								<div className="text-success font-medium">Charge created!</div>
								<div className="text-default-500 text-xs">
									Share this payment link: <b>{createdCharge.paymentId}</b>
								</div>
							</div>
						)}
					</form>
				</ModalBody>
				<ModalFooter className="flex justify-end pt-2">
					<Button
						onPress={onClose}
						variant="light"
						className="mr-2"
						isDisabled={createLoading}>
						Close
					</Button>
					<Button
						color="primary"
						type="submit"
						isLoading={createLoading}
						onClick={handleSubmit}
						isDisabled={createLoading || !paymentId || !amount}>
						{createLoading ? <Spinner size="sm" /> : "Create"}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
