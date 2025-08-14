import React from "react";
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
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLiskBusiness } from "@/hooks/useLiskBusiness";

export function TokenBalances() {
	const { float, loadingFloat, floatError } = useLiskBusiness();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:wallet" className="text-xl" />
					<span className="font-semibold">Token Balances</span>
				</div>
			</CardHeader>
			<CardBody>
				{loadingFloat ? (
					<div className="flex items-center gap-2">
						<Spinner label="Loading balances..." />
					</div>
				) : floatError ? (
					<div className="text-danger">{floatError}</div>
				) : (
					<Table aria-label="Token Balances" removeWrapper>
						<TableHeader>
							<TableColumn>TOKEN</TableColumn>
							<TableColumn>BALANCE</TableColumn>
						</TableHeader>
						<TableBody>
							{float.map((token) => (
								<TableRow key={token.name}>
									<TableCell>{token.name}</TableCell>
									<TableCell>
										<Chip color="primary" variant="flat">
											{token.balance}
										</Chip>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</CardBody>
		</Card>
	);
}
