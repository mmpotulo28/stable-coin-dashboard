"use client";
import React, { useState } from "react";
import { Button, Input, Card, CardBody, CardHeader, Image, Chip, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ChargeList } from "@/components/charges/ChargeList";
import { CreateChargeModal } from "@/components/charges/CreateChargeModal";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN as string;

export default function ChargesPage() {
	const [userId, setUserId] = useState("");
	const [confirmedUserId, setConfirmedUserId] = useState<string | null>(null);
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [checkingUser, setCheckingUser] = useState(false);
	const [userError, setUserError] = useState<string | null>(null);
	const [userInfo, setUserInfo] = useState<any>(null);
	const [showCheckingMsg, setShowCheckingMsg] = useState(false);

	const handleConfirm = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!userId.trim()) return;
		setCheckingUser(true);
		setShowCheckingMsg(true);
		setUserError(null);
		setUserInfo(null);
		try {
			const { data } = await axios.get<{ user: any }>(`${API_BASE}/users/${userId.trim()}`, {
				headers: { Authorization: API_TOKEN },
			});
			setUserInfo(data.user);
			setConfirmedUserId(userId.trim());
		} catch (err: any) {
			if (err?.response?.status === 404) setUserError("User not found.");
			else if (err?.response?.status === 400) setUserError("Invalid user ID.");
			else if (err?.response?.status === 401) setUserError("Unauthorized.");
			else setUserError("Failed to fetch user.");
		} finally {
			setCheckingUser(false);
			setTimeout(() => setShowCheckingMsg(false), 800);
		}
	};

	const handleReset = () => {
		setUserId("");
		setConfirmedUserId(null);
		setUserInfo(null);
		setUserError(null);
		setShowCheckingMsg(false);
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
							isDisabled={checkingUser}
						/>
						<Button
							color="primary"
							type="submit"
							isDisabled={!userId.trim() || checkingUser}
							startContent={<Icon icon="lucide:search" />}>
							{checkingUser ? <Spinner size="sm" /> : "Proceed"}
						</Button>
					</form>
					{showCheckingMsg && (
						<div className="flex items-center gap-2 mt-4 text-default-500">
							<Spinner size="sm" />
							<span>Checking if user exists...</span>
						</div>
					)}
					{userError && <div className="text-danger mt-4 font-medium">{userError}</div>}
					{userInfo && (
						<div className="mt-4 flex flex-col items-center gap-2">
							<Chip color="primary" variant="flat">
								{userInfo.email}
							</Chip>
							<div className="text-default-500 text-xs">
								User found: {userInfo.firstName} {userInfo.lastName}
							</div>
						</div>
					)}
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
