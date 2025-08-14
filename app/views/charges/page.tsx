"use client";
import React, { useState } from "react";
import { Button, Input, Card, CardBody, CardHeader, Image, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ChargeList } from "@/components/charges/ChargeList";
import { CreateChargeModal } from "@/components/charges/CreateChargeModal";

export default function ChargesPage() {
	const [userId, setUserId] = useState("");
	const [confirmedUserId, setConfirmedUserId] = useState<string | null>(null);
	const [isCreateOpen, setIsCreateOpen] = useState(false);

	const handleConfirm = (e: React.FormEvent) => {
		e.preventDefault();
		if (userId.trim()) setConfirmedUserId(userId.trim());
	};

	const handleReset = () => {
		setUserId("");
		setConfirmedUserId(null);
	};

	return (
		<div className="flex-1 overflow-auto p-6 space-y-8">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-semibold flex items-center gap-2">
					<Icon icon="lucide:link" />
					Charges
				</h1>
			</div>
			{!confirmedUserId ? (
				<Card className="max-w-lg mx-auto p-8 flex flex-col items-center">
					<Image
						src="https://illustrations.popsy.co/gray/woman-on-laptop-google.svg"
						alt="Prompt illustration"
						width={120}
						height={120}
						className="mb-4"
					/>
					<h2 className="text-lg font-semibold mb-2">Enter User ID</h2>
					<p className="text-default-500 mb-6 text-center">
						To manage charges, please enter the User ID below.
					</p>
					<form onSubmit={handleConfirm} className="w-full flex gap-2 items-center">
						<Input
							placeholder="User ID"
							value={userId}
							onChange={(e) => setUserId(e.target.value)}
							className="max-w-xs"
							size="sm"
							autoFocus
						/>
						<Button
							color="primary"
							type="submit"
							isDisabled={!userId.trim()}
							startContent={<Icon icon="lucide:search" />}>
							Proceed
						</Button>
					</form>
				</Card>
			) : (
				<>
					<div className="flex items-center justify-between mb-6">
						<div className="flex gap-2 items-center">
							<Chip color="primary" variant="flat" className="px-3 py-1">
								User ID: {confirmedUserId}
							</Chip>
							<Button
								variant="light"
								onPress={handleReset}
								className="ml-2"
								size="sm"
								startContent={<Icon icon="lucide:arrow-left" />}>
								Change User
							</Button>
						</div>
						<Button
							color="primary"
							startContent={<Icon icon="lucide:link-plus" />}
							onPress={() => setIsCreateOpen(true)}>
							Create Charge
						</Button>
					</div>
					<ChargeList userId={confirmedUserId} />
					<CreateChargeModal
						isOpen={isCreateOpen}
						onClose={() => setIsCreateOpen(false)}
						userId={confirmedUserId}
					/>
				</>
			)}
		</div>
	);
}
