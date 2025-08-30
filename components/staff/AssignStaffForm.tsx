import React, { useState } from "react";
import { Card, CardHeader, CardBody, Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLiskStaff } from "@mmpotulo/stablecoin-hooks/dist/hooks/useLiskStaff";
import { useOrganization, useUser } from "@clerk/nextjs";

export function AssignStaffForm() {
	const { user } = useUser();
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;
	const { assignStaffLoading, assignStaffError, assignStaff, assignStaffMessage } = useLiskStaff({
		apiKey,
	});

	const [input, setInput] = useState("");

	const handleAssign = async (input: string) => {
		if (!user?.id) return;
		await assignStaff(user.id, input);
	};

	return (
		<Card className="max-w-lg mx-auto mb-6">
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:user-plus" className="text-xl" />
					<span className="font-semibold">Assign Staff Member</span>
				</div>
			</CardHeader>
			<CardBody>
				{assignStaffMessage && (
					<div className="text-success text-center mb-4">{assignStaffMessage}</div>
				)}

				{assignStaffError && (
					<div className="text-error text-center mb-4">{assignStaffError}</div>
				)}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (input.trim()) handleAssign(input.trim());
					}}
					className="flex gap-2 items-center flex-wrap">
					<Input
						placeholder="Email or Referral Code"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="max-w-xs"
						isDisabled={assignStaffLoading}
					/>
					<Button
						color="primary"
						type="submit"
						isLoading={assignStaffLoading}
						isDisabled={assignStaffLoading || !input.trim()}
						startContent={<Icon icon="lucide:user-plus" />}>
						Assign
					</Button>
				</form>
			</CardBody>
		</Card>
	);
}
