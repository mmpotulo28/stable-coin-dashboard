import React, { useState, useEffect } from "react";
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
	Pagination,
	Snippet,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { iPendingTx, useLiskBusiness } from "@mmpotulo/stablecoin-hooks";
import { useOrganization } from "@clerk/nextjs";

export function PendingTransactions() {
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;
	const { pendingTx, pendingLoading, pendingError, fetchPendingTx } = useLiskBusiness({
		apiKey: `Bearer ${apiKey}`,
	});
	const [page, setPage] = useState(1);

	// Fetch paginated transactions
	useEffect(() => {
		fetchPendingTx();
	}, [page]);

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:clock" className="text-xl" />
					<span className="font-semibold">Pending Transactions</span>
				</div>
			</CardHeader>
			<CardBody>
				{pendingLoading ? (
					<div className="flex items-center gap-2">
						<Spinner label="Loading pending transactions..." />
					</div>
				) : pendingError ? (
					<div className="text-danger">{pendingError}</div>
				) : (
					<>
						<Table aria-label="Pending Transactions" removeWrapper>
							<TableHeader>
								<TableColumn>ID</TableColumn>
								<TableColumn>USER</TableColumn>
								<TableColumn>TYPE</TableColumn>
								<TableColumn>METHOD</TableColumn>
								<TableColumn>CURRENCY</TableColumn>
								<TableColumn>VALUE</TableColumn>
								<TableColumn>STATUS</TableColumn>
								<TableColumn>CREATED AT</TableColumn>
							</TableHeader>
							<TableBody>
								{pendingTx?.map((tx: iPendingTx) => (
									<TableRow key={tx.id}>
										<TableCell>{tx.id}</TableCell>
										<TableCell>
											<Snippet
												hideSymbol
												className="max-w-xs overflow-auto"
												size="sm"
												variant="bordered">
												{tx.user?.email ?? tx.userId}
											</Snippet>
										</TableCell>
										<TableCell className="text-nowrap">{tx.txType}</TableCell>
										<TableCell>{tx.method}</TableCell>
										<TableCell>{tx.creditCurrency}</TableCell>
										<TableCell>{tx.creditValue}</TableCell>
										<TableCell>
											<Chip
												color={
													(tx.status as string) === "pending"
														? "warning"
														: "default"
												}
												variant="flat">
												{tx.status}
											</Chip>
										</TableCell>
										<TableCell>
											{tx.createdAt
												? new Date(tx.createdAt).toLocaleString()
												: "-"}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						{
							<div className="flex justify-end mt-4">
								<Pagination
									page={page}
									total={Math.ceil((pendingTx?.length ?? 0) / 10)}
									onChange={setPage}
									showControls
								/>
							</div>
						}
					</>
				)}
			</CardBody>
		</Card>
	);
}
