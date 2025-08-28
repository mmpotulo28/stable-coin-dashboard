import React from "react";
import { Card, CardHeader, CardBody, Button, Input, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useOrganization } from "@clerk/nextjs";
import { useLiskBusiness } from "@mmpotulo/stablecoin-hooks";

export function MintStablecoins() {
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;
	const { mintForm, setMintForm, mintLoading, mintMessage, mintError, mintStableCoins } =
		useLiskBusiness({ apiKey: `Bearer ${apiKey}` });

	const handleMint = async (e: React.FormEvent) => {
		e.preventDefault();
		await mintStableCoins();
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:coins" className="text-xl" />
					<span className="font-semibold">Mint Stablecoins</span>
				</div>
			</CardHeader>
			<CardBody>
				<form onSubmit={handleMint} className="space-y-4">
					<div className="flex gap-4 sm:flex-col">
						<Input
							label="Amount"
							name="transactionAmount"
							type="number"
							min={1}
							value={mintForm.transactionAmount}
							onChange={(e) =>
								setMintForm((f) => ({ ...f, transactionAmount: e.target.value }))
							}
							isRequired
						/>
						<Input
							label="Recipient (optional)"
							name="transactionRecipient"
							value={mintForm.transactionRecipient}
							onChange={(e) =>
								setMintForm((f) => ({ ...f, transactionRecipient: e.target.value }))
							}
						/>
					</div>
					<Input
						label="Notes (optional)"
						name="transactionNotes"
						value={mintForm.transactionNotes}
						onChange={(e) =>
							setMintForm((f) => ({ ...f, transactionNotes: e.target.value }))
						}
					/>
					<Button
						color="primary"
						type="submit"
						isLoading={mintLoading}
						isDisabled={mintLoading || !mintForm.transactionAmount}
						startContent={<Icon icon="lucide:coins" />}>
						Mint
					</Button>
					{mintMessage && <div className="text-success mt-2">{mintMessage}</div>}
					{mintError && <div className="text-danger mt-2">{mintError}</div>}
				</form>
			</CardBody>
		</Card>
	);
}
