import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

// --- Bank Account Form ---
function BankAccountForm({
	form,
	setForm,
	onSubmit,
	loading,
	onCancel,
	isEdit,
}: {
	form: {
		accountHolder: string;
		accountNumber: string;
		branchCode: string;
		bankName: string;
	};
	setForm: React.Dispatch<React.SetStateAction<typeof form>>;
	onSubmit: (e: React.FormEvent) => void;
	loading: boolean;
	onCancel: () => void;
	isEdit: boolean;
}) {
	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:edit" className="text-xl" />
					<span className="font-semibold">
						{isEdit ? "Edit Bank Account" : "Create Bank Account"}
					</span>
				</div>
			</CardHeader>
			<CardBody>
				<form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Input
						label="Account Holder"
						value={form.accountHolder}
						onChange={(e) => setForm((f) => ({ ...f, accountHolder: e.target.value }))}
						isRequired
					/>
					<Input
						label="Account Number"
						value={form.accountNumber}
						onChange={(e) => setForm((f) => ({ ...f, accountNumber: e.target.value }))}
						isRequired
					/>
					<Input
						label="Branch Code"
						value={form.branchCode}
						onChange={(e) => setForm((f) => ({ ...f, branchCode: e.target.value }))}
						isRequired
					/>
					<Input
						label="Bank Name"
						value={form.bankName}
						onChange={(e) => setForm((f) => ({ ...f, bankName: e.target.value }))}
						isRequired
					/>
					<div className="col-span-1 md:col-span-2 flex gap-2 mt-4">
						<Button
							color="primary"
							type="submit"
							isLoading={loading}
							isDisabled={
								loading ||
								!form.accountHolder ||
								!form.accountNumber ||
								!form.branchCode ||
								!form.bankName
							}
							startContent={<Icon icon="lucide:save" />}>
							{isEdit ? "Update" : "Create"}
						</Button>
						<Button variant="light" type="button" onPress={onCancel} className="ml-2">
							Cancel
						</Button>
					</div>
				</form>
			</CardBody>
		</Card>
	);
}

export default BankAccountForm;
