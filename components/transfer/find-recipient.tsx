import React, { useState } from "react";
import { Card, CardHeader, CardBody, Input, Button, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { UserDetailsCard } from "../users/user-details-card";
import { useLiskTransfer } from "@mmpotulo/stablecoin-hooks";
import { useOrganization } from "@clerk/nextjs";

export function FindRecipient() {
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;
	const { recipient, recipientLoading, recipientError, fetchRecipient } = useLiskTransfer({
		apiKey: `Bearer ${apiKey}`,
	});

	const [recipientId, setRecipientId] = useState("");

	return (
		<Card className="max-w-2xl mx-auto mb-8">
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:search" className="text-xl" />
					<span className="font-semibold">Find Recipient</span>
				</div>
			</CardHeader>
			<CardBody>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (recipientId.trim()) fetchRecipient(recipientId.trim());
					}}
					className="flex gap-2 items-center flex-wrap mb-2">
					<Input
						placeholder="Recipient email or payment identifier"
						value={recipientId}
						onChange={(e) => setRecipientId(e.target.value)}
						className="max-w-xs"
						isDisabled={recipientLoading}
					/>
					<Button
						color="primary"
						type="submit"
						isLoading={recipientLoading}
						isDisabled={recipientLoading || !recipientId.trim()}
						startContent={<Icon icon="lucide:search" />}>
						Lookup
					</Button>
				</form>
				{recipientLoading && <Spinner label="Searching recipient..." />}
				{recipientError && <div className="text-danger mt-2">{recipientError}</div>}
				{recipient && <UserDetailsCard user={recipient} />}
			</CardBody>
		</Card>
	);
}
