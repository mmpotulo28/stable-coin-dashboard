import React, { useState } from "react";
import { Card, CardHeader, CardBody, Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export function AssignStaffForm({
	onAssign,
	loading,
}: {
	onAssign: (input: string) => void;
	loading: boolean;
}) {
	const [input, setInput] = useState("");

	return (
		<Card className="max-w-lg mx-auto mb-6">
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:user-plus" className="text-xl" />
					<span className="font-semibold">Assign Staff Member</span>
				</div>
			</CardHeader>
			<CardBody>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (input.trim()) onAssign(input.trim());
					}}
					className="flex gap-2 items-center flex-wrap">
					<Input
						placeholder="Email or Referral Code"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="max-w-xs"
						isDisabled={loading}
					/>
					<Button
						color="primary"
						type="submit"
						isLoading={loading}
						isDisabled={loading || !input.trim()}
						startContent={<Icon icon="lucide:user-plus" />}>
						Assign
					</Button>
				</form>
			</CardBody>
		</Card>
	);
}
