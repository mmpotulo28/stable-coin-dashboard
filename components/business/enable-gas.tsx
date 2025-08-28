import React, { useState } from "react";
import { Card, CardHeader, CardBody, Button, Input, Divider, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useOrganization } from "@clerk/nextjs";
import { useLiskBusiness } from "@mmpotulo/stablecoin-hooks";

export function EnableGas() {
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;
	const {
		gasLoading,
		gasMessage,
		gasError,
		enableBusinessGas,
		userGasLoading,
		userGasMessage,
		userGasError,
		enableUserGas,
	} = useLiskBusiness({ apiKey });

	const [userId, setUserId] = useState("");

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<div className="flex items-center gap-3">
					<Icon icon="lucide:zap" className="text-2xl text-primary" />
					<span className="font-semibold text-lg">Enable Gas</span>
				</div>
			</CardHeader>
			<CardBody>
				<div className="flex flex-col gap-8 md:flex-row md:gap-12">
					{/* Enable gas for business */}
					<div className="flex-1 min-w-[220px]">
						<div className="flex items-center gap-2 mb-2">
							<Icon icon="lucide:building" className="text-lg text-default-500" />
							<span className="font-semibold">Business Gas</span>
							<Tooltip content="Allocate gas for the business account">
								<Icon icon="lucide:info" className="text-default-400 text-base" />
							</Tooltip>
						</div>
						<p className="text-default-400 text-sm mb-4">
							Grants the business account a fixed amount of gas for transactions.
						</p>
						<Button
							color="primary"
							onPress={enableBusinessGas}
							isLoading={gasLoading}
							isDisabled={gasLoading}
							startContent={<Icon icon="lucide:zap" />}>
							Enable Gas for Business
						</Button>
						{gasMessage && <div className="text-success mt-2">{gasMessage}</div>}
						{gasError && <div className="text-danger mt-2">{gasError}</div>}
					</div>
					<Divider orientation="vertical" className="hidden md:block mx-2" />
					{/* Enable gas for user */}
					<div className="flex-1 min-w-[220px]">
						<div className="flex items-center gap-2 mb-2">
							<Icon icon="lucide:user" className="text-lg text-default-500" />
							<span className="font-semibold">User Gas</span>
							<Tooltip content="Activate gas payment for a specific user">
								<Icon icon="lucide:info" className="text-default-400 text-base" />
							</Tooltip>
						</div>
						<p className="text-default-400 text-sm mb-4">
							Enter a user ID to grant gas for their transactions.
						</p>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								if (userId.trim()) enableUserGas(userId.trim());
							}}
							className="flex gap-2 items-center flex-wrap">
							<Input
								placeholder="User ID"
								value={userId}
								onChange={(e) => setUserId(e.target.value)}
								className="max-w-xs"
								isDisabled={userGasLoading}
								startContent={<Icon icon="lucide:user" />}
								autoComplete="off"
							/>
							<Button
								color="secondary"
								type="submit"
								isLoading={userGasLoading}
								isDisabled={userGasLoading || !userId.trim()}
								startContent={<Icon icon="lucide:zap" />}>
								Enable Gas for User
							</Button>
						</form>
						{userGasMessage && (
							<div className="text-success mt-2">{userGasMessage}</div>
						)}
						{userGasError && <div className="text-danger mt-2">{userGasError}</div>}
					</div>
				</div>
			</CardBody>
		</Card>
	);
}
