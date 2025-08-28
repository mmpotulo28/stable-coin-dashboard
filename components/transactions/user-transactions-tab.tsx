import React, { useCallback, useEffect, useState } from "react";
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
import { useLiskBalances, useLiskTransactions, useLiskUsers } from "@mmpotulo/stablecoin-hooks";
import { useOrganization } from "@clerk/nextjs";
import { TokenBalances } from "../business/token-balances";

export function UserTransactionsTab() {
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;

	const [userId, setUserId] = useState("");
	const [searched, setSearched] = useState(false);

	const { fetchBalances, balancesLoading, balancesError, balances, balancesMessage } =
		useLiskBalances({ apiKey });
	const { users, fetchUsers } = useLiskUsers({ apiKey });

	useEffect(() => {
		fetchUsers();
	}, []);

	const handleSearch = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			if (!userId.trim()) return;
			await fetchBalances(userId.trim());
			setSearched(true);
		},
		[userId, fetchBalances],
	);

	return (
		<Card className="max-w-2xl mx-auto mb-8">
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:user" className="text-xl" />
					<span className="font-semibold">User Balances</span>
				</div>
			</CardHeader>
			<CardBody>
				{balancesMessage && (
					<div className="text-success text-center mb-4">{balancesMessage}</div>
				)}

				{balancesError && (
					<div className="text-error text-center mb-4">{balancesError}</div>
				)}

				<form onSubmit={handleSearch} className="flex flex-col gap-3 mb-4">
					<div className="w-full flex gap-3 items-center">
						<Input
							placeholder="User ID"
							value={userId}
							onChange={(e) => setUserId(e.target.value)}
							size="sm"
							label="User ID (optional)"
							autoFocus
							isDisabled={balancesLoading}
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
						isDisabled={!userId.trim() || balancesLoading}
						startContent={<Icon icon="lucide:search" />}>
						{balancesLoading ? <Spinner size="sm" /> : "Search"}
					</Button>
				</form>
				{searched && (
					<TokenBalances
						float={balances}
						loadingFloat={balancesLoading}
						floatError={balancesError as string}
					/>
				)}
			</CardBody>
		</Card>
	);
}
