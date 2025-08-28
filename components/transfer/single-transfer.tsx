import React, { useEffect, useState } from "react";
import {
	Card,
	CardHeader,
	CardBody,
	Input,
	Button,
	Spinner,
	Autocomplete,
	AutocompleteItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useOrganization } from "@clerk/nextjs";
import { useLiskTransfer, useLiskUsers } from "@mmpotulo/stablecoin-hooks";

export function SingleTransfer() {
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;
	const { transferLoading, transferMessage, transferError, makeTransfer } = useLiskTransfer({
		apiKey: `Bearer ${apiKey}`,
	});

	const { users, usersError, fetchUsers } = useLiskUsers({
		apiKey: `Bearer ${apiKey}`,
	});

	const [userId, setUserId] = useState("");
	const [recipientId, setRecipientId] = useState("");
	const [amount, setAmount] = useState("");
	const [notes, setNotes] = useState("");

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<Card className="max-w-2xl mx-auto mb-8">
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:send" className="text-xl" />
					<span className="font-semibold">Single Transfer</span>
				</div>
			</CardHeader>
			<CardBody>
				{usersError && <div className="text-danger mt-2">{usersError}</div>}

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
					<Autocomplete
						size="md"
						className="w-full "
						defaultItems={users}
						required
						label="Sender user ID"
						value={userId}
						placeholder="Sender user ID"
						onSelectionChange={(key) => key && setUserId(key.toString())}>
						{(user) => (
							<AutocompleteItem
								key={user.id}
								title={`${user.firstName} ${user.lastName}`}
								description={user.email}
							/>
						)}
					</Autocomplete>

					<Autocomplete
						size="md"
						className="w-full "
						defaultItems={users}
						required
						label="Recipient (email or payment identifier)"
						value={recipientId}
						placeholder="Recipient ID"
						onSelectionChange={(key) => key && setRecipientId(key.toString())}>
						{(user) => (
							<AutocompleteItem
								key={user.paymentIdentifier}
								title={`${user.firstName} ${user.lastName}`}
								description={user.email}
							/>
						)}
					</Autocomplete>
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
					{transferMessage && <div className="text-success mt-2">{transferMessage}</div>}
					{transferError && <div className="text-danger mt-2">{transferError}</div>}
				</form>
			</CardBody>
		</Card>
	);
}
