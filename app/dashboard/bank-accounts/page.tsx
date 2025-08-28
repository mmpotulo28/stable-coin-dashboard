"use client";
import React, { useState } from "react";
import { Card, Input, Button, Spinner, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import BankAccountForm from "@/components/banks/BankAccountForm";
import BankAccountView from "@/components/banks/BankAccountView";
import DepositWithdrawForm from "@/components/banks/DepositWithdrawForm";
import { useLiskBank } from "@mmpotulo/stablecoin-hooks";
import { useOrganization, useUser } from "@clerk/nextjs";

// --- Main Page ---
export default function BankAccountsPage() {
	const { user } = useUser();
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;
	const [userId, setUserId] = useState("");
	const [searched, setSearched] = useState(false);
	const [editMode, setEditMode] = useState(false);

	const {
		bankAccount,
		bankLoading,
		bankError,
		getBankAccount,
		upsertBankAccount,
		deleteBankAccount,
		createTransaction,
	} = useLiskBank({ apiKey: `Bearer ${apiKey}`, user });

	const [form, setForm] = useState({
		accountHolder: "",
		accountNumber: "",
		branchCode: "",
		bankName: "",
	});

	const [txForm, setTxForm] = useState({
		transactionType: "deposit",
		transactionMethod: "",
		transactionCurrency: "",
		transactionAmount: "",
		transactionNetwork: "",
		transactionAddress: "",
	});
	const [txMessage, setTxMessage] = useState<string | null>(null);
	const [txError, setTxError] = useState<string | null>(null);

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!userId.trim()) return;
		await getBankAccount(userId.trim());
		setSearched(true);
		setEditMode(false);
	};

	const handleEdit = () => {
		if (!bankAccount) return;
		setForm({
			accountHolder: bankAccount.accountHolder,
			accountNumber: bankAccount.accountNumber,
			branchCode: bankAccount.branchCode,
			bankName: bankAccount.bank,
		});
		setEditMode(true);
	};

	const handleUpsert = async (e: React.FormEvent) => {
		e.preventDefault();
		await upsertBankAccount({
			userId: userId.trim(),
			...form,
		});
		setEditMode(false);
	};

	const handleDelete = async () => {
		if (!userId.trim()) return;
		await deleteBankAccount(userId.trim());
		setSearched(false);
		setEditMode(false);
		setUserId("");
	};

	const handleTxSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setTxMessage(null);
		setTxError(null);
		try {
			const res = await createTransaction({
				userId: userId.trim(),
				transactionType: txForm.transactionType,
				transactionMethod: txForm.transactionMethod,
				transactionCurrency: txForm.transactionCurrency,
				transactionAmount: Number(txForm.transactionAmount),
				transactionNetwork: txForm.transactionNetwork,
				transactionAddress: txForm.transactionAddress,
			});
			setTxMessage(res?.message || "Transaction created successfully.");
		} catch {
			setTxError("Failed to create transaction.");
		}
	};

	return (
		<div className="flex-1 overflow-auto p-4 md:p-8 space-y-8">
			<Card className="w-full max-w-full mx-0 mb-8 bg-default-100">
				<div className="flex justify-between items-center p-4">
					<h1 className="text-2xl font-semibold flex items-start gap-2">
						<Icon icon="lucide:user" />
						Bank Accounts
					</h1>
					<form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 ">
						<Input
							variant="bordered"
							placeholder="Enter User ID"
							value={userId}
							onChange={(e) => setUserId(e.target.value)}
							className="max-w-xs w-full"
							isDisabled={bankLoading}
						/>
						<Button
							color="primary"
							type="submit"
							isDisabled={!userId.trim() || bankLoading}
							startContent={<Icon icon="lucide:search" />}>
							{bankLoading ? <Spinner size="sm" /> : "Search"}
						</Button>
					</form>
					{bankError && <div className="text-danger mb-4">{bankError}</div>}
					{searched && !editMode && !bankAccount && (
						<div className="text-default-500 mb-4">
							No bank account found for this user. You can create one below.
						</div>
					)}
				</div>
			</Card>

			<Tabs className="mb-8 max-w-full" aria-label="Bank Account Management Tabs">
				<Tab
					key="bank-account"
					title="Bank Account"
					className="flex flex-col justify-start ">
					{/* Bank Account Section */}
					<div className="flex flex-col gap-6">
						{searched && !editMode && bankAccount && (
							<BankAccountView
								bankAccount={bankAccount}
								onEdit={handleEdit}
								onDelete={handleDelete}
							/>
						)}
						{(editMode || (searched && !bankAccount)) && (
							<BankAccountForm
								form={form}
								setForm={setForm}
								onSubmit={handleUpsert}
								loading={bankLoading}
								onCancel={() => setEditMode(false)}
								isEdit={!!bankAccount}
							/>
						)}
					</div>
				</Tab>

				<Tab key="deposit-withdraw" title="Deposit/Withdraw">
					{/* Deposit/Withdraw Section */}

					{searched && (
						<DepositWithdrawForm
							txForm={txForm}
							setTxForm={setTxForm}
							onSubmit={handleTxSubmit}
							loading={bankLoading}
							txMessage={txMessage}
							txError={txError}
						/>
					)}
				</Tab>
			</Tabs>
		</div>
	);
}
