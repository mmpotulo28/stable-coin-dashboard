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
	Button,
	Chip,
	Input,
	Spinner,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { ICharge } from "@/types/users";
import { useCharges } from "@/hooks/useCharges";
import { UpdateChargeModal } from "@/components/charges/UpdateChargeModal";

export function ChargeList({ userId }: { userId: string }) {
	const {
		charges,
		chargesLoading,
		chargesError,
		fetchCharges,
		deleteCharge,
		deleteLoading,
		deleteError,
		deleteSuccess,
	} = useCharges();

	const [search, setSearch] = useState("");
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [updateId, setUpdateId] = useState<string | null>(null);

	React.useEffect(() => {
		if (userId) fetchCharges(userId);
		// eslint-disable-next-line
	}, [userId]);

	const filteredCharges = charges.filter((charge) =>
		(charge.paymentId ?? "").toLowerCase().includes(search.trim().toLowerCase()),
	);

	const selectedCharge = charges.find((c) => c.id === updateId) || null;

	return (
		<Card className="max-w-full mx-auto mb-8">
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:link" className="text-xl" />
					<span className="font-semibold">Charges</span>
				</div>
				<div className="flex-1 flex justify-end items-center gap-2">
					<Input
						placeholder="Search by payment ID..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="max-w-xs"
						size="sm"
						startContent={<Icon icon="lucide:search" />}
						autoFocus
					/>
					<Button
						variant="light"
						isIconOnly
						onPress={() => fetchCharges(userId)}
						isLoading={chargesLoading}
						aria-label="Refresh"
						className="ml-2">
						<Icon icon="lucide:refresh-cw" />
					</Button>
				</div>
			</CardHeader>
			<CardBody>
				{chargesLoading ? (
					<Spinner label="Loading charges..." />
				) : chargesError ? (
					<div className="text-danger">{chargesError}</div>
				) : (
					<Table aria-label="Charges" removeWrapper>
						<TableHeader>
							<TableColumn>ID</TableColumn>
							<TableColumn>Payment ID</TableColumn>
							<TableColumn>Amount</TableColumn>
							<TableColumn>Status</TableColumn>
							<TableColumn>Note</TableColumn>
							<TableColumn>Created At</TableColumn>
							<TableColumn>Actions</TableColumn>
						</TableHeader>
						<TableBody>
							{filteredCharges.map((charge) => (
								<TableRow key={charge.id}>
									<TableCell>{charge.id}</TableCell>
									<TableCell>{charge.paymentId}</TableCell>
									<TableCell>{charge.amount}</TableCell>
									<TableCell>
										<Chip
											color={
												charge.status === "COMPLETE" ? "success" : "warning"
											}
											variant="flat">
											{charge.status}
										</Chip>
									</TableCell>
									<TableCell>{charge.note ?? "-"}</TableCell>
									<TableCell>
										{charge.createdAt
											? new Date(charge.createdAt).toLocaleString()
											: "-"}
									</TableCell>
									<TableCell>
										<div className="flex gap-2">
											<button
												type="button"
												aria-label="View user details"
												onClick={() => setUpdateId(charge.id)}
												className="p-2 rounded-md hover:bg-default-100">
												<Icon icon="lucide:pencil" className="text-xl" />
											</button>
											<button
												type="button"
												aria-label="Update user"
												onClick={async () => {
													setDeleteId(charge.id);
													await deleteCharge({
														userId,
														chargeId: charge.id,
													});
													setDeleteId(null);
												}}
												className="p-2 rounded-md hover:bg-default-100 text-danger">
												<Icon icon="lucide:trash" className="text-xl" />
											</button>
										</div>

										{deleteError && deleteId === charge.id && (
											<div className="text-danger">{deleteError}</div>
										)}
										{deleteSuccess && deleteId === charge.id && (
											<div className="text-success">{deleteSuccess}</div>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</CardBody>
			<UpdateChargeModal
				isOpen={!!updateId}
				onClose={() => setUpdateId(null)}
				userId={userId}
				charge={selectedCharge}
				onUpdated={() => {
					setUpdateId(null);
					fetchCharges(userId);
				}}
			/>
		</Card>
	);
}
