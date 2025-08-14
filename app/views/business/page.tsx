"use client";
import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { TokenBalances } from "@/components/business/token-balances";
import { EnableGas } from "@/components/business/enable-gas";
import { PendingTransactions } from "@/components/business/pending-transactions";
import { MintStablecoins } from "@/components/business/mint-stablecoins";

const BusinessManagement = () => {
	return (
		<div className="flex-1 overflow-auto p-6 space-y-8">
			<h1 className="text-2xl font-semibold mb-6">Business Management</h1>
			<Tabs
				className="mb-8 max-w-full"
				variant="bordered"
				aria-label="Business Management Tabs">
				<Tab
					key="balances-mint"
					title={
						<span className="flex items-center gap-2">
							<Icon icon="lucide:wallet" />
							Balances & Mint
						</span>
					}>
					<div className="flex gap-6 flex-wrap">
						<div className="flex-1">
							<TokenBalances />
						</div>
						<div className="flex-2">
							<MintStablecoins />
						</div>
					</div>
				</Tab>
				<Tab
					key="gas"
					title={
						<span className="flex items-center gap-2">
							<Icon icon="lucide:zap" />
							Enable Gas
						</span>
					}>
					<EnableGas />
				</Tab>
				<Tab
					key="pending"
					title={
						<span className="flex items-center gap-2">
							<Icon icon="lucide:clock" />
							Pending Transactions
						</span>
					}>
					<PendingTransactions />
				</Tab>
			</Tabs>
		</div>
	);
};

export default BusinessManagement;
