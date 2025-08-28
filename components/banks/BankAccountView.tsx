import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { iBankAccount } from "@mmpotulo/stablecoin-hooks";

// --- Bank Account View ---
function BankAccountView({
	bankAccount,
	onEdit,
	onDelete,
}: {
	bankAccount: iBankAccount;
	onEdit: () => void;
	onDelete: () => void;
}) {
	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:credit-card" className="text-xl" />
					<span className="font-semibold">Bank Account Details</span>
				</div>
			</CardHeader>
			<CardBody>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<span className="font-semibold text-default-700">Account Holder:</span>
						<div>{bankAccount.accountHolder}</div>
					</div>
					<div>
						<span className="font-semibold text-default-700">Account Number:</span>
						<div>{bankAccount.accountNumber}</div>
					</div>
					<div>
						<span className="font-semibold text-default-700">Branch Code:</span>
						<div>{bankAccount.branchCode}</div>
					</div>
					<div>
						<span className="font-semibold text-default-700">Bank Name:</span>
						<div>{bankAccount.bank}</div>
					</div>
					<div>
						<span className="font-semibold text-default-700">Created At:</span>
						<div>
							{bankAccount.createdAt
								? new Date(bankAccount.createdAt).toLocaleString()
								: "-"}
						</div>
					</div>
					<div>
						<span className="font-semibold text-default-700">Updated At:</span>
						<div>
							{bankAccount.updatedAt
								? new Date(bankAccount.updatedAt).toLocaleString()
								: "-"}
						</div>
					</div>
				</div>
				<div className="flex gap-2 mt-6">
					<Button
						color="primary"
						onPress={onEdit}
						startContent={<Icon icon="lucide:pencil" />}>
						Edit
					</Button>
					<Button
						color="danger"
						variant="bordered"
						onPress={onDelete}
						startContent={<Icon icon="lucide:trash" />}>
						Delete
					</Button>
				</div>
			</CardBody>
		</Card>
	);
}

export default BankAccountView;
