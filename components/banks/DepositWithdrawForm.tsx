import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardHeader, CardBody, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";

// --- Deposit/Withdraw Form ---
function DepositWithdrawForm({
	txForm,
	setTxForm,
	onSubmit,
	loading,
	txSuccess,
	txError,
}: {
	txForm: {
		transactionType: string;
		transactionMethod: string;
		transactionCurrency: string;
		transactionAmount: string;
		transactionNetwork: string;
		transactionAddress: string;
	};
	setTxForm: React.Dispatch<React.SetStateAction<typeof txForm>>;
	onSubmit: (e: React.FormEvent) => void;
	loading: boolean;
	txSuccess: string | null;
	txError: string | null;
}) {
	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:arrow-left-right" className="text-xl" />
					<span className="font-semibold">Deposit / Withdrawal</span>
				</div>
			</CardHeader>
			<CardBody>
				<form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Select
						label="Transaction Type"
						value={txForm.transactionType}
						onChange={(e) =>
							setTxForm((f) => ({
								...f,
								transactionType: e.target.value,
							}))
						}
						isRequired>
						<SelectItem key="deposit">Deposit</SelectItem>
						<SelectItem key="withdrawal">Withdrawal</SelectItem>
					</Select>
					<Select
						label="Method"
						value={txForm.transactionMethod}
						onChange={(e) =>
							setTxForm((f) => ({
								...f,
								transactionMethod: e.target.value,
							}))
						}
						isRequired>
						<SelectItem key="EFT">EFT</SelectItem>
						<SelectItem key="Cash">Cash</SelectItem>
						<SelectItem key="Card">Card</SelectItem>
						<SelectItem key="Other">Other</SelectItem>
					</Select>
					<Select
						label="Currency"
						value={txForm.transactionCurrency}
						onChange={(e) =>
							setTxForm((f) => ({
								...f,
								transactionCurrency: e.target.value,
							}))
						}
						isRequired>
						<SelectItem key="ZAR">ZAR</SelectItem>
						<SelectItem key="USD">USD</SelectItem>
						<SelectItem key="EUR">EUR</SelectItem>
						<SelectItem key="GBP">GBP</SelectItem>
						<SelectItem key="Other">Other</SelectItem>
					</Select>
					<Input
						label="Amount"
						type="number"
						min={1}
						value={txForm.transactionAmount}
						onChange={(e) =>
							setTxForm((f) => ({
								...f,
								transactionAmount: e.target.value,
							}))
						}
						isRequired
					/>
					<Input
						label="Network (optional)"
						value={txForm.transactionNetwork}
						onChange={(e) =>
							setTxForm((f) => ({
								...f,
								transactionNetwork: e.target.value,
							}))
						}
					/>
					<Input
						label="Address (optional)"
						value={txForm.transactionAddress}
						onChange={(e) =>
							setTxForm((f) => ({
								...f,
								transactionAddress: e.target.value,
							}))
						}
					/>
					<div className="col-span-1 md:col-span-2 flex gap-2 mt-4">
						<Button
							color="primary"
							type="submit"
							isLoading={loading}
							isDisabled={
								loading ||
								!txForm.transactionType ||
								!txForm.transactionMethod ||
								!txForm.transactionCurrency ||
								!txForm.transactionAmount
							}
							startContent={<Icon icon="lucide:arrow-left-right" />}>
							Create Transaction
						</Button>
						<Button
							variant="light"
							type="button"
							onPress={() => {
								setTxForm({
									transactionType: "deposit",
									transactionMethod: "",
									transactionCurrency: "",
									transactionAmount: "",
									transactionNetwork: "",
									transactionAddress: "",
								});
							}}
							className="ml-2">
							Clear
						</Button>
					</div>
				</form>
				{txSuccess && <div className="text-success mt-2">{txSuccess}</div>}
				{txError && <div className="text-danger mt-2">{txError}</div>}
			</CardBody>
		</Card>
	);
}

export default DepositWithdrawForm;
