import React, { useState } from "react";
import {
	Card,
	CardHeader,
	CardBody,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Chip,
	Spinner,
	Button,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { TransactionDetailsModal } from "./transaction-details-modal";
import { iTransaction } from "@mmpotulo/stablecoin-hooks";

export function UserTransactions({
	transactions,
	loading,
	error,
}: {
	transactions: iTransaction[];
	loading: boolean;
	error: string | undefined;
}) {
	const [selectedTx, setSelectedTx] = useState<iTransaction | undefined>(undefined);

	return (
		<Card className="w-full mx-auto mb-4 justify-center flex flex-col">
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:clock" className="text-xl" />
					<span className="font-semibold">Transaction History</span>
				</div>
			</CardHeader>
			<CardBody>
				{loading ? (
					<Spinner label="Loading transactions..." />
				) : error ? (
					<div className="text-danger">{error}</div>
				) : transactions.length === 0 ? (
					<div className="text-default-500">No transactions found.</div>
				) : (
					<Table aria-label="User Transactions" removeWrapper>
						<TableHeader>
							<TableColumn>ID</TableColumn>
							<TableColumn>Type</TableColumn>
							<TableColumn>Method</TableColumn>
							<TableColumn>Currency</TableColumn>
							<TableColumn>Value</TableColumn>
							<TableColumn>Status</TableColumn>
							<TableColumn>Date</TableColumn>
							<TableColumn>Actions</TableColumn>
						</TableHeader>
						<TableBody>
							{transactions.map((tx) => (
								<TableRow key={tx.id}>
									<TableCell>{tx.id}</TableCell>
									<TableCell>{tx.txType}</TableCell>
									<TableCell>{tx.method}</TableCell>
									<TableCell>{tx.currency}</TableCell>
									<TableCell>{tx.value}</TableCell>
									<TableCell>
										<Chip
											color={tx.status === "pending" ? "warning" : "success"}
											variant="flat">
											{tx.status}
										</Chip>
									</TableCell>
									<TableCell>
										{tx.createdAt
											? new Date(tx.createdAt).toLocaleString()
											: "-"}
									</TableCell>
									<TableCell>
										<Button
											size="sm"
											variant="light"
											onPress={() => setSelectedTx(tx)}>
											<Icon icon="lucide:eye" />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
				<TransactionDetailsModal
					transaction={selectedTx}
					isOpen={!!selectedTx}
					onClose={() => setSelectedTx(undefined)}
				/>
			</CardBody>
		</Card>
	);
}
