"use client";
import React, { useEffect, useState } from "react";
import {
	Button,
	Input,
	Card,
	Image,
	Chip,
	Spinner,
	Autocomplete,
	AutocompleteItem,
	Divider,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { ChargeList } from "@/components/charges/ChargeList";
import { CreateChargeModal } from "@/components/charges/CreateChargeModal";
import OrgProPlanProvider from "@/context/OrgRequiredProvider";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useOrganization } from "@clerk/nextjs";
import { useLiskUsers } from "@mmpotulo/stablecoin-hooks";

export default function ChargesPage() {
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;
	const { users, fetchUsers, singleUser, getUser, usersError, usersLoading } = useLiskUsers({
		apiKey,
	});

	const [userId, setUserId] = useState("");
	const [confirmedUserId, setConfirmedUserId] = useState<string | null>(null);
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const { globalUsers } = useGlobalContext();

	useEffect(() => {
		fetchUsers();
	}, []);

	const handleConfirm = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!userId.trim()) {
			return;
		}

		await getUser({ id: userId });
	};

	const handleReset = () => {
		setUserId("");
		setConfirmedUserId(null);
	};

	console.log("global users", globalUsers);

	return (
		<OrgProPlanProvider>
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
							className="mb-4 mt-0 bg-white"
						/>
						<h2 className="text-lg font-semibold mb-2">Enter User ID</h2>
						<p className="text-default-500 mb-6 text-center">
							To manage charges, please enter the User ID below.
						</p>
						<form
							onSubmit={handleConfirm}
							className="w-full flex flex-col gap-2 items-start">
							<Input
								placeholder="User ID"
								value={userId}
								onChange={(e) => setUserId(e.target.value)}
								size="md"
								label="User ID (optional)"
								autoFocus
								isDisabled={usersLoading}
								className="w-full"
							/>

							<span className="text-default-500 mx-auto">OR</span>

							<Autocomplete
								size="md"
								className="w-full"
								defaultItems={users}
								label="Pick a User"
								value={userId}
								placeholder="Search a user"
								onSelectionChange={(key) => key && setUserId(key.toString())}>
								{(user) => (
									<AutocompleteItem
										key={user.id}
										title={`${user.firstName} ${user.lastName}`}
										description={user.email}
									/>
								)}
							</Autocomplete>

							<Divider />
							<Button
								color="primary"
								type="submit"
								className="w-full"
								isDisabled={!userId.trim() || usersLoading}
								startContent={<Icon icon="lucide:search" />}>
								{usersLoading ? <Spinner size="sm" /> : "Proceed"}
							</Button>
						</form>
						{usersLoading && (
							<div className="flex items-center gap-2 mt-4 text-default-500">
								<Spinner size="sm" />
								<span>Checking if user exists...</span>
							</div>
						)}
						{usersError && (
							<div className="text-danger mt-4 font-medium">{usersError}</div>
						)}
						{singleUser && (
							<div className="mt-4 flex flex-col items-center gap-2">
								<Chip color="primary" variant="flat">
									{singleUser.email}
								</Chip>
								<div className="text-default-500 text-xs">
									User found: {singleUser.firstName} {singleUser.lastName}
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
		</OrgProPlanProvider>
	);
}
