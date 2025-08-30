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
	Divider,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { UserTransactions } from "@/components/transactions/user-transactions";
import { useLiskTransactions, useLiskUsers } from "@mmpotulo/stablecoin-hooks";
import { useOrganization } from "@clerk/nextjs";

export function AllTransactions() {
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;

	const [userId, setUserId] = useState("");
	const [searched, setSearched] = useState(false);
	const { transactions, transactionsLoading, transactionsError, fetchTransactions } =
		useLiskTransactions({ apiKey: apiKey });
	const { users, fetchUsers } = useLiskUsers({ apiKey: apiKey });

	useEffect(() => {
		fetchUsers();
	}, []);

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!userId.trim()) return;
		await fetchTransactions(userId.trim());
		setSearched(true);
	};

	return (
		<Card className="max-w-2xl mx-auto mb-8">
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:users" className="text-xl" />
					<span className="font-semibold">All Transactions (by User ID)</span>
				</div>
			</CardHeader>
			<CardBody>
				<form onSubmit={handleSearch} className="w-full flex flex-col gap-2 items-start">
					<div className="w-full flex gap-3 items-center">
						<Input
							placeholder="User ID"
							value={userId}
							onChange={(e) => setUserId(e.target.value)}
							size="sm"
							label="User ID (optional)"
							autoFocus
							isDisabled={transactionsLoading}
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
					<Button
						color="primary"
						type="submit"
						className="w-full"
						isDisabled={!userId.trim() || transactionsLoading}
						startContent={<Icon icon="lucide:search" />}>
						{transactionsLoading ? <Spinner size="sm" /> : "Proceed"}
					</Button>
				</form>
				{searched && (
					<UserTransactions
						transactions={transactions}
						loading={transactionsLoading}
						error={transactionsError}
					/>
				)}
			</CardBody>
		</Card>
	);
}
