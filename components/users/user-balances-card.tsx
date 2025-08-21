import React from "react";
import { Card, CardHeader, CardBody, Chip, Spinner, Alert } from "@heroui/react";
import { Icon } from "@iconify/react";
import { IUserTokenBalance } from "@/types/users";

export function UserBalancesCard({
	balances,
	loading,
	error,
}: {
	balances: IUserTokenBalance[];
	loading: boolean;
	error: string | null;
}) {
	return (
		<Card className="max-w-md mx-auto mb-4">
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:wallet" className="text-xl" />
					<span className="font-semibold">Token Balances</span>
				</div>
			</CardHeader>
			<CardBody>
				{loading ? (
					<Spinner label="Loading balances..." />
				) : error ? (
					<Alert title="Error" description={error} variant="bordered" color="danger" />
				) : balances.length === 0 ? (
					<div className="text-default-500">No tokens found.</div>
				) : (
					<div className="flex flex-col gap-2">
						{balances.map((token) => (
							<div key={token.name} className="flex items-center gap-2">
								<Chip color="primary" variant="flat" className="px-2 py-1">
									{token.name}
								</Chip>
								<span className="font-bold">{token.balance}</span>
							</div>
						))}
					</div>
				)}
			</CardBody>
		</Card>
	);
}
