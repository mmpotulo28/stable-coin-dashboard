import React, { useState } from "react";
import { Card, CardHeader, CardBody, Input, Button, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLiskTransactions } from "@/hooks/useLiskTransactions";
import { UserBalancesCard } from "@/components/users/user-balances-card";
import { UserTransactions } from "@/components/transactions/user-transactions";
import { TokenBalances } from "../business/token-balances";

export function UserTransactionsTab() {
	const [userId, setUserId] = useState("");
	const [searched, setSearched] = useState(false);
	const {
		balances,
		balancesLoading,
		balancesError,
		fetchUserBalances,

		fetchUserTransactions,
	} = useLiskTransactions();

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!userId.trim()) return;
		await fetchUserBalances(userId.trim());
		await fetchUserTransactions(userId.trim());
		setSearched(true);
	};

	return (
		<Card className="max-w-2xl mx-auto mb-8">
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:user" className="text-xl" />
					<span className="font-semibold">User Balances</span>
				</div>
			</CardHeader>
			<CardBody>
				<form onSubmit={handleSearch} className="flex gap-2 mb-4">
					<Input
						placeholder="Enter User ID"
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
						className="max-w-xs"
					/>
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
						floatError={balancesError}
					/>
				)}
			</CardBody>
		</Card>
	);
}
