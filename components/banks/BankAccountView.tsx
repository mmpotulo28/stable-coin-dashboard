import { Button, Chip, Card, CardHeader, CardBody, Divider, Image } from "@heroui/react";
import { Icon } from "@iconify/react";
import { iBankAccount } from "@mmpotulo/stablecoin-hooks";

function formatDate(date?: string) {
	return date ? new Date(date).toLocaleString() : "-";
}

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
		<Card className="w-full relative overflow-hidden shadow-xl bg-gradient-to-br from-default-50 via-default-100 to-default-200">
			{/* Decorative Illustration */}
			<Icon
				icon="lucide:credit-card"
				fontSize={100}
				className="absolute right-6 top-6 opacity-10 pointer-events-none"
			/>
			<CardHeader>
				<div className="flex items-center gap-3">
					<Icon icon="lucide:credit-card" className="text-2xl text-primary" />
					<span className="font-bold text-lg">Bank Account Details</span>
					<Chip color="success" variant="flat" className="ml-2">
						Active
					</Chip>
				</div>
			</CardHeader>
			<CardBody>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
					<div className="flex items-center gap-2">
						<Icon icon="lucide:user" className="text-lg text-default-500" />
						<span className="font-semibold text-default-700">Account Holder:</span>
						<span className="ml-2">{bankAccount.accountHolder}</span>
					</div>
					<div className="flex items-center gap-2">
						<Icon icon="lucide:hash" className="text-lg text-default-500" />
						<span className="font-semibold text-default-700">Account Number:</span>
						<Chip color="primary" variant="flat" className="ml-2">
							{bankAccount.accountNumber}
						</Chip>
					</div>
					<div className="flex items-center gap-2">
						<Icon icon="lucide:barcode" className="text-lg text-default-500" />
						<span className="font-semibold text-default-700">Branch Code:</span>
						<span className="ml-2">{bankAccount.branchCode}</span>
					</div>
					<div className="flex items-center gap-2">
						<Icon icon="lucide:banknote" className="text-lg text-default-500" />
						<span className="font-semibold text-default-700">Bank Name:</span>
						<span className="ml-2">{bankAccount.bank}</span>
					</div>
					<div className="flex items-center gap-2">
						<Icon icon="lucide:calendar" className="text-lg text-default-500" />
						<span className="font-semibold text-default-700">Created At:</span>
						<span className="ml-2 text-default-400">
							{formatDate(bankAccount.createdAt)}
						</span>
					</div>
					<div className="flex items-center gap-2">
						<Icon icon="lucide:clock" className="text-lg text-default-500" />
						<span className="font-semibold text-default-700">Updated At:</span>
						<span className="ml-2 text-default-400">
							{formatDate(bankAccount.updatedAt)}
						</span>
					</div>
				</div>
				<Divider className="my-4" />
				<div className="flex gap-4 mt-2 justify-end">
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
