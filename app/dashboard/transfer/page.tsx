"use client";
import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { FindRecipient } from "@/components/transfer/find-recipient";
import { SingleTransfer } from "@/components/transfer/single-transfer";
import { BatchTransfer } from "@/components/transfer/batch-transfer";
import OrgProPlanProvider from "@/context/OrgRequiredProvider";

export default function TransferPage() {
	return (
		<OrgProPlanProvider>
			<div className="flex-1 overflow-auto p-6 space-y-8">
				<h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
					<Icon icon="lucide:arrow-right-left" />
					Transfers
				</h1>
				<Tabs className="mb-8 max-w-full" variant="bordered" aria-label="Transfer Tabs">
					<Tab
						key="find"
						title={
							<span className="flex items-center gap-2">
								<Icon icon="lucide:search" />
								Find Recipient
							</span>
						}>
						<FindRecipient />
					</Tab>
					<Tab
						key="single"
						title={
							<span className="flex items-center gap-2">
								<Icon icon="lucide:send" />
								Single Transfer
							</span>
						}>
						<SingleTransfer />
					</Tab>
					<Tab
						key="batch"
						title={
							<span className="flex items-center gap-2">
								<Icon icon="lucide:list-plus" />
								Batch Transfer
							</span>
						}>
						<BatchTransfer />
					</Tab>
				</Tabs>
			</div>
		</OrgProPlanProvider>
	);
}
