"use client";
import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, Input, Button, Spinner, Image } from "@heroui/react";
import { Icon } from "@iconify/react";
import { AllTransactions } from "@/components/transactions/all-transactions";
import { UserTransactionsTab } from "@/components/transactions/user-transactions-tab";
import { TransactionSearch } from "@/components/transactions/transaction-search";

export default function TransactionsPage() {
	const [selectedTab, setSelectedTab] = useState("all");

	return (
		<div className="flex-1 overflow-auto p-6 space-y-8">
			<h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
				<Icon icon="lucide:repeat" />
				Transactions
			</h1>
			<Tabs
				selectedKey={selectedTab}
				onSelectionChange={(key) => setSelectedTab(key as string)}
				className="mb-8 max-w-full"
				variant="bordered"
				aria-label="Transactions Tabs">
				<Tab key="all" title="All Transactions">
					<AllTransactions />
				</Tab>
				<Tab key="user" title="User Balances">
					<UserTransactionsTab />
				</Tab>
				<Tab key="search" title="Search Transaction">
					<TransactionSearch />
				</Tab>
			</Tabs>
		</div>
	);
}
