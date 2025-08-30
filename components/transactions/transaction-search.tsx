import React, { useEffect, useState } from "react";
import {
	Card,
	CardHeader,
	CardBody,
	Input,
	Button,
	Spinner,
	Image,
	Autocomplete,
	AutocompleteItem,
	Divider,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { TransactionDetailsModal } from "@/components/transactions/transaction-details-modal";
import { useLiskUsers, useLiskTransactions } from "@mmpotulo/stablecoin-hooks";
import { useOrganization } from "@clerk/nextjs";

export function TransactionSearch() {
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;

	const [userId, setUserId] = useState("");
	const [transactionId, setTransactionId] = useState("");
	const [searched, setSearched] = useState(false);
	const { users, fetchUsers } = useLiskUsers({ apiKey: apiKey });

	useEffect(() => {
		fetchUsers();
	}, []);

	const { transaction, transactionLoading, transactionError, fetchSingleTransaction } =
		useLiskTransactions({ apiKey: apiKey });

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!userId.trim() || !transactionId.trim()) return;
		await fetchSingleTransaction(userId.trim(), transactionId.trim());
		setSearched(true);
	};

	return (
		<Card className="max-w-2xl mx-auto mb-8">
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:search" className="text-xl" />
					<span className="font-semibold">Search Transaction</span>
				</div>
			</CardHeader>
			<CardBody>
				<form onSubmit={handleSearch} className="flex flex-col gap-3 mb-4 flex-wrap">
					<div className="w-full flex gap-3 items-center">
						<Input
							placeholder="User ID"
							value={userId}
							onChange={(e) => setUserId(e.target.value)}
							size="sm"
							label="User ID (optional)"
							autoFocus
							isDisabled={transactionLoading}
							className="w-full"
						/>

						<span className="text-default-500 mx-auto">OR</span>
						<Autocomplete
							size="sm"
							className="w-full"
							defaultItems={users}
							label="Pick a User"
							value={userId}
							placeholder="Search a user"
							onSelectionChange={(key) => key && setUserId(key.toString())}>
							{(user) => (
								<AutocompleteItem
									key={user.id}
									title={`${user.firstName} ${user.lastName}`}
									description={user.email}
								/>
							)}
						</Autocomplete>
					</div>
					<Divider />

					<Input
						placeholder="Transaction ID"
						value={transactionId}
						onChange={(e) => setTransactionId(e.target.value)}
						className="w-full"
					/>
					<Button
						color="primary"
						type="submit"
						isDisabled={!userId.trim() || !transactionId.trim() || transactionLoading}
						startContent={<Icon icon="lucide:search" />}>
						{transactionLoading ? <Spinner size="sm" /> : "Search"}
					</Button>
				</form>
				{searched && (
					<>
						{transactionError && (
							<div className="flex flex-col items-center gap-2 mt-4">
								<Image
									src="https://illustrations.popsy.co/gray/error.svg"
									alt="Error illustration"
									width={80}
									height={80}
								/>
								<div className="text-danger font-medium">{transactionError}</div>
							</div>
						)}
						<TransactionDetailsModal
							transaction={transaction}
							isOpen={!!transaction}
							onClose={() => {}}
						/>
					</>
				)}
			</CardBody>
		</Card>
	);
}
