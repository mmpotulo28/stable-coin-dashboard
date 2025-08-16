"use client";
import React, { useState } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ApiTokenList } from "@/components/api-tokens/ApiTokenList";
import { CreateApiTokenModal } from "@/components/api-tokens/CreateApiTokenModal";

export default function ApiTokensPage() {
	const [isCreateOpen, setIsCreateOpen] = useState(false);

	return (
		<div className="flex-1 overflow-auto p-6 space-y-8">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-semibold flex items-center gap-2">
					<Icon icon="lucide:key" />
					API Tokens
				</h1>
				<Button
					color="primary"
					startContent={<Icon icon="lucide:key-plus" />}
					onPress={() => setIsCreateOpen(true)}>
					Create API Token
				</Button>
			</div>
			<ApiTokenList />
			<CreateApiTokenModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
		</div>
	);
}
