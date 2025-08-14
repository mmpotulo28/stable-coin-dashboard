import React, { useState } from "react";
import { Card, CardHeader, CardBody, Input, Button, Spinner, Image } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLiskTransactions } from "@/hooks/useLiskTransactions";
import { TransactionDetailsModal } from "@/components/transactions/transaction-details-modal";

export function TransactionSearch() {
	const [userId, setUserId] = useState("");
	const [transactionId, setTransactionId] = useState("");
	const [searched, setSearched] = useState(false);

	const { transaction, transactionLoading, transactionError, fetchSingleTransaction } =
		useLiskTransactions();

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
				<form onSubmit={handleSearch} className="flex gap-2 mb-4 flex-wrap">
					<Input
						placeholder="User ID"
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
						className="max-w-xs"
					/>
					<Input
						placeholder="Transaction ID"
						value={transactionId}
						onChange={(e) => setTransactionId(e.target.value)}
						className="max-w-xs"
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
