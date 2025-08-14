"use client";
import React, { useState } from "react";
import {
	Card,
	CardHeader,
	CardBody,
	Input,
	Button,
	Spinner,
	Divider,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLiskTransfer } from "@/hooks/useLiskTransfer";

export default function TransferPage() {
	const {
		recipient,
		recipientLoading,
		recipientError,
		fetchRecipient,
		transferLoading,
		transferSuccess,
		transferError,
		makeTransfer,
		batchLoading,
		batchSuccess,
		batchError,
		makeBatchTransfer,
	} = useLiskTransfer();

	const [userId, setUserId] = useState("");
	const [recipientId, setRecipientId] = useState("");
	const [amount, setAmount] = useState("");
	const [notes, setNotes] = useState("");
	const [batchPayments, setBatchPayments] = useState<{ recipient: string; amount: number }[]>([]);
	const [batchNotes, setBatchNotes] = useState("");

	// Add payment to batch
	const handleAddBatchPayment = () => {
		if (!recipientId.trim() || !amount) return;
		setBatchPayments((prev) => [
			...prev,
			{ recipient: recipientId.trim(), amount: Number(amount) },
		]);
		setRecipientId("");
		setAmount("");
	};

	// Remove payment from batch
	const handleRemoveBatchPayment = (idx: number) => {
		setBatchPayments((prev) => prev.filter((_, i) => i !== idx));
	};

	return (
		<div className="flex-1 overflow-auto p-6 space-y-8">
			<h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
				<Icon icon="lucide:arrow-right-left" />
				Transfers
			</h1>
			<Card className="max-w-2xl mx-auto mb-8">
				<CardHeader>
					<div className="flex items-center gap-2">
						<Icon icon="lucide:search" className="text-xl" />
						<span className="font-semibold">Find Recipient</span>
					</div>
				</CardHeader>
				<CardBody>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							if (recipientId.trim()) fetchRecipient(recipientId.trim());
						}}
						className="flex gap-2 items-center flex-wrap mb-2">
						<Input
							placeholder="Recipient email or payment identifier"
							value={recipientId}
							onChange={(e) => setRecipientId(e.target.value)}
							className="max-w-xs"
							isDisabled={recipientLoading}
						/>
						<Button
							color="primary"
							type="submit"
							isLoading={recipientLoading}
							isDisabled={recipientLoading || !recipientId.trim()}
							startContent={<Icon icon="lucide:search" />}>
							Lookup
						</Button>
					</form>
					{recipientLoading && <Spinner label="Searching recipient..." />}
					{recipientError && <div className="text-danger mt-2">{recipientError}</div>}
					{recipient && (
						<div className="mt-4 p-4 rounded-lg bg-default-100">
							<div className="font-semibold mb-1">{recipient.email}</div>
							<div className="text-default-500 text-sm mb-1">
								Payment Identifier: {recipient.paymentIdentifier}
							</div>
							<div className="text-default-500 text-sm">
								Name: {recipient.firstName} {recipient.lastName}
							</div>
						</div>
					)}
				</CardBody>
			</Card>
			<Card className="max-w-2xl mx-auto mb-8">
				<CardHeader>
					<div className="flex items-center gap-2">
						<Icon icon="lucide:send" className="text-xl" />
						<span className="font-semibold">Single Transfer</span>
					</div>
				</CardHeader>
				<CardBody>
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							await makeTransfer({
								userId: userId.trim(),
								transactionAmount: Number(amount),
								transactionRecipient: recipientId.trim(),
								transactionNotes: notes,
							});
						}}
						className="space-y-4">
						<Input
							label="Sender User ID"
							value={userId}
							onChange={(e) => setUserId(e.target.value)}
							isRequired
						/>
						<Input
							label="Recipient (email or payment identifier)"
							value={recipientId}
							onChange={(e) => setRecipientId(e.target.value)}
							isRequired
						/>
						<Input
							label="Amount"
							type="number"
							min={1}
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							isRequired
						/>
						<Input
							label="Notes (optional)"
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
						/>
						<Button
							color="primary"
							type="submit"
							isLoading={transferLoading}
							isDisabled={
								transferLoading || !userId.trim() || !recipientId.trim() || !amount
							}
							startContent={<Icon icon="lucide:send" />}>
							Transfer
						</Button>
						{transferSuccess && (
							<div className="text-success mt-2">{transferSuccess}</div>
						)}
						{transferError && <div className="text-danger mt-2">{transferError}</div>}
					</form>
				</CardBody>
			</Card>
			<Card className="max-w-2xl mx-auto">
				<CardHeader>
					<div className="flex items-center gap-2">
						<Icon icon="lucide:list-plus" className="text-xl" />
						<span className="font-semibold">Batch Transfer</span>
					</div>
				</CardHeader>
				<CardBody>
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							await makeBatchTransfer({
								userId: userId.trim(),
								payments: batchPayments,
								transactionNotes: batchNotes,
							});
						}}
						className="space-y-4">
						<Input
							label="Sender User ID"
							value={userId}
							onChange={(e) => setUserId(e.target.value)}
							isRequired
						/>
						<Divider className="my-2" />
						<div className="flex gap-2 items-center flex-wrap">
							<Input
								label="Recipient"
								placeholder="email or payment identifier"
								value={recipientId}
								onChange={(e) => setRecipientId(e.target.value)}
							/>
							<Input
								label="Amount"
								type="number"
								min={1}
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
							/>
							<Button
								type="button"
								color="secondary"
								onPress={handleAddBatchPayment}
								isDisabled={!recipientId.trim() || !amount}
								startContent={<Icon icon="lucide:plus" />}>
								Add
							</Button>
						</div>
						{batchPayments.length > 0 && (
							<Table aria-label="Batch Payments" removeWrapper className="mb-4">
								<TableHeader>
									<TableColumn>Recipient</TableColumn>
									<TableColumn>Amount</TableColumn>
									<TableColumn>Actions</TableColumn>
								</TableHeader>
								<TableBody>
									{batchPayments.map((p, idx) => (
										<TableRow key={idx}>
											<TableCell>{p.recipient}</TableCell>
											<TableCell>{p.amount}</TableCell>
											<TableCell>
												<Button
													type="button"
													variant="light"
													color="danger"
													onPress={() => handleRemoveBatchPayment(idx)}
													startContent={<Icon icon="lucide:trash" />}>
													Remove
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)}
						<Input
							label="Batch Notes (optional)"
							value={batchNotes}
							onChange={(e) => setBatchNotes(e.target.value)}
						/>
						<Button
							color="primary"
							type="submit"
							isLoading={batchLoading}
							isDisabled={
								batchLoading || !userId.trim() || batchPayments.length === 0
							}
							startContent={<Icon icon="lucide:list-plus" />}>
							Execute Batch Transfer
						</Button>
						{batchSuccess && <div className="text-success mt-2">{batchSuccess}</div>}
						{batchError && <div className="text-danger mt-2">{batchError}</div>}
					</form>
				</CardBody>
			</Card>
		</div>
	);
}
