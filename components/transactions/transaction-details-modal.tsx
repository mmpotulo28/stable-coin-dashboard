import React from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Chip,
	Divider,
	Snippet,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { IUserTransaction } from "@/types/users";

export function TransactionDetailsModal({
	transaction,
	isOpen,
	onClose,
}: {
	transaction: IUserTransaction | undefined;
	isOpen: boolean;
	onClose: () => void;
}) {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className="max-w-lg mx-auto rounded-2xl shadow-2xl bg-default-50">
			<ModalContent>
				<ModalHeader className="flex items-center gap-3 pb-3 bg-default-50 rounded-t-2xl">
					<Icon icon="lucide:receipt" className="text-2xl text-primary" />
					<span className="text-lg font-semibold">Transaction Details</span>
				</ModalHeader>
				<ModalBody>
					{transaction ? (
						<div className="space-y-6 py-2">
							<div className="flex items-center gap-3 mb-2">
								<Chip color="primary" variant="flat" className="px-3 py-1">
									{transaction.txType}
								</Chip>
								<Chip color="secondary" variant="flat" className="px-3 py-1">
									{transaction.method}
								</Chip>
								<Chip
									color={transaction.status === "pending" ? "warning" : "success"}
									variant="flat"
									className="px-3 py-1">
									{transaction.status}
								</Chip>
							</div>
							<Divider />
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div>
									<span className="font-semibold text-default-700">
										Transaction ID:
									</span>
									<Snippet
										hideSymbol
										variant="bordered"
										size="sm"
										className="mt-1 max-w-full overflow-auto w-full"
										copyButtonProps={{ "aria-label": "Copy Transaction ID" }}>
										{transaction.id}
									</Snippet>
								</div>
								<div>
									<span className="font-semibold text-default-700">User ID:</span>
									<Snippet
										hideSymbol
										variant="bordered"
										size="sm"
										className="mt-1 max-w-full overflow-auto w-full"
										copyButtonProps={{ "aria-label": "Copy User ID" }}>
										{transaction.userId}
									</Snippet>
								</div>
								<div>
									<span className="font-semibold text-default-700">
										Currency:
									</span>
									<div className="text-default-500">{transaction.currency}</div>
								</div>
								<div>
									<span className="font-semibold text-default-700">Value:</span>
									<div className="font-bold text-lg">{transaction.value}</div>
								</div>
								<div>
									<span className="font-semibold text-default-700">
										Created At:
									</span>
									<div className="text-default-500">
										{transaction.createdAt
											? new Date(transaction.createdAt).toLocaleString()
											: "-"}
									</div>
								</div>
								{transaction.externalId && (
									<div>
										<span className="font-semibold text-default-700">
											External ID:
										</span>
										<Snippet
											hideSymbol
											variant="bordered"
											size="sm"
											className="mt-1 max-w-full overflow-auto w-full"
											copyButtonProps={{ "aria-label": "Copy External ID" }}>
											{transaction.externalId}
										</Snippet>
									</div>
								)}
							</div>
						</div>
					) : (
						<div className="flex flex-col items-center gap-2 py-8">
							<Icon icon="lucide:alert-circle" className="text-4xl text-danger" />
							<div className="text-default-500">No transaction selected.</div>
						</div>
					)}
				</ModalBody>
				<ModalFooter className="flex justify-end pt-3 bg-default-50 rounded-b-2xl">
					<Button
						onPress={onClose}
						color="primary"
						variant="flat"
						className="px-6 py-2 rounded-lg font-semibold">
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
