import React, { useState } from "react";
import {
	Card,
	CardHeader,
	CardBody,
	Input,
	Button,
	Divider,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useOrganization } from "@clerk/nextjs";
import { useLiskTransfer } from "@mmpotulo/stablecoin-hooks";

export function BatchTransfer() {
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;
	const { batchTransferLoading, batchTransferMessage, batchTransferError, makeBatchTransfer } =
		useLiskTransfer({ apiKey });

	const [userId, setUserId] = useState("");
	const [recipientId, setRecipientId] = useState("");
	const [amount, setAmount] = useState("");
	const [batchPayments, setBatchPayments] = useState<{ recipient: string; amount: number }[]>([]);
	const [batchNotes, setBatchNotes] = useState("");

	const handleAddBatchPayment = () => {
		if (!recipientId.trim() || !amount) return;
		setBatchPayments((prev) => [
			...prev,
			{ recipient: recipientId.trim(), amount: Number(amount) },
		]);
		setRecipientId("");
		setAmount("");
	};

	const handleRemoveBatchPayment = (idx: number) => {
		setBatchPayments((prev) => prev.filter((_, i) => i !== idx));
	};

	return (
		<Card className="max-w-full mx-auto">
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:list-plus" className="text-xl" />
					<span className="font-semibold">Batch Transfer</span>
				</div>
			</CardHeader>
			<CardBody className="flex flex-row md:flex-nowrap sm:flex-wrap gap-4">
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						await makeBatchTransfer({
							userId: userId.trim(),
							payments: batchPayments,
							transactionNotes: batchNotes,
						});
					}}
					className="space-y-4 min-w-xs flex-1">
					<Input
						label="Sender User ID"
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
						isRequired
					/>
					<Input
						label="Batch Notes (optional)"
						value={batchNotes}
						onChange={(e) => setBatchNotes(e.target.value)}
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
							size="sm"
							type="button"
							color="secondary"
							onPress={handleAddBatchPayment}
							isDisabled={!recipientId.trim() || !amount}
							startContent={<Icon icon="lucide:plus" />}>
							Add
						</Button>
						<Divider className="my-2" />
					</div>

					<Button
						color="primary"
						type="submit"
						isLoading={batchTransferLoading}
						isDisabled={
							batchTransferLoading || !userId.trim() || batchPayments.length === 0
						}
						startContent={<Icon icon="lucide:list-plus" />}>
						Execute Batch Transfer
					</Button>
					{batchTransferMessage && (
						<div className="text-success mt-2">{batchTransferMessage}</div>
					)}
					{batchTransferError && (
						<div className="text-danger mt-2">{batchTransferError}</div>
					)}
				</form>

				<Table aria-label="Batch Payments" removeWrapper className="mb-4 flex-2">
					<TableHeader>
						<TableColumn>Recipient</TableColumn>
						<TableColumn>Amount</TableColumn>
						<TableColumn>Actions</TableColumn>
					</TableHeader>
					<TableBody>
						{!batchPayments.length ? (
							<TableRow>
								<TableCell
									colSpan={3}
									className="text-center bg-default-100 text-danger py-14 rounded-2xl">
									No Batch Payments Added
								</TableCell>
							</TableRow>
						) : (
							batchPayments?.map((p, idx) => (
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
							))
						)}

						{}
					</TableBody>
				</Table>
			</CardBody>
		</Card>
	);
}
