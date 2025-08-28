import React, { useState } from "react";
import {
	Card,
	CardHeader,
	CardBody,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Button,
	Chip,
	Input,
	Spinner,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useOrganization } from "@clerk/nextjs";
import { useLiskApiTokens } from "@mmpotulo/stablecoin-hooks";

export function ApiTokenList() {
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;
	const {
		tokens,
		apiTokenLoading,
		apiTokenError,
		updateToken,
		updateTokenError,
		updateTokenLoading,
		revokeToken,
		revokeTokenError,
		revokeTokenLoading,
		revokeTokenMessage,
		fetchTokens,
	} = useLiskApiTokens({ apiKey: `Bearer ${apiKey}` });

	const [editId, setEditId] = useState<string | null>(null);
	const [editDesc, setEditDesc] = useState("");
	const [revokeId, setRevokeId] = useState<string | null>(null);
	const [search, setSearch] = useState("");

	React.useEffect(() => {
		fetchTokens();
		// eslint-disable-next-line
	}, []);

	// Keyboard matching: case-insensitive substring search
	const filteredTokens = tokens.filter((token) =>
		(token.description ?? "").toLowerCase().includes(search.trim().toLowerCase()),
	);

	return (
		<Card className="max-w-full mx-auto mb-8">
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:key" className="text-xl" />
					<span className="font-semibold">API Tokens</span>
				</div>
				<div className="flex-1 flex justify-end items-center gap-2">
					<Input
						placeholder="Search by description..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="max-w-xs"
						size="sm"
						startContent={<Icon icon="lucide:search" />}
						autoFocus
					/>
					<Button
						variant="light"
						isIconOnly
						onPress={() => fetchTokens()}
						isLoading={apiTokenLoading}
						aria-label="Refresh"
						className="ml-2">
						<Icon icon="lucide:refresh-cw" />
					</Button>
				</div>
			</CardHeader>
			<CardBody>
				{apiTokenLoading ? (
					<Spinner label="Loading tokens..." />
				) : apiTokenError ? (
					<div className="text-danger">{apiTokenError}</div>
				) : (
					<Table aria-label="API Tokens" removeWrapper>
						<TableHeader>
							<TableColumn>ID</TableColumn>
							<TableColumn>Description</TableColumn>
							<TableColumn>Status</TableColumn>
							<TableColumn>Created At</TableColumn>
							<TableColumn>Actions</TableColumn>
						</TableHeader>
						<TableBody>
							{filteredTokens.map((token) => (
								<TableRow key={token.id}>
									<TableCell>{token.id}</TableCell>
									<TableCell>
										{editId === token.id ? (
											<form
												onSubmit={async (e) => {
													e.preventDefault();
													await updateToken(token.id, editDesc);
													setEditId(null);
												}}>
												<Input
													value={editDesc}
													onChange={(e) => setEditDesc(e.target.value)}
													size="sm"
													className="max-w-xs"
												/>
												<Button
													type="submit"
													size="sm"
													isLoading={updateTokenLoading}
													className="ml-2">
													Save
												</Button>
												<Button
													type="button"
													size="sm"
													variant="light"
													onPress={() => setEditId(null)}
													className="ml-2">
													Cancel
												</Button>
												{updateTokenError && (
													<div className="text-danger">
														{updateTokenError}
													</div>
												)}
											</form>
										) : (
											<div className="flex items-center gap-2">
												<span>{token.description ?? "-"}</span>
												<Button
													size="sm"
													variant="light"
													onPress={() => {
														setEditId(token.id);
														setEditDesc(token.description ?? "");
													}}>
													<Icon icon="lucide:pencil" />
												</Button>
											</div>
										)}
									</TableCell>
									<TableCell>
										<Chip
											color={token.revoked ? "danger" : "success"}
											variant="flat">
											{token.revoked ? "Revoked" : "Active"}
										</Chip>
									</TableCell>
									<TableCell>
										{token.createdAt
											? new Date(token.createdAt).toLocaleString()
											: "-"}
									</TableCell>
									<TableCell>
										<Button
											size="sm"
											color="danger"
											isLoading={revokeTokenLoading && revokeId === token.id}
											isDisabled={token.revoked}
											onPress={async () => {
												setRevokeId(token.id);
												await revokeToken(token.id);
												setRevokeId(null);
											}}>
											<Icon icon="lucide:trash" />
											Revoke
										</Button>
										{revokeTokenError && revokeId === token.id && (
											<div className="text-danger">{revokeTokenError}</div>
										)}
										{revokeTokenMessage && revokeId === token.id && (
											<div className="text-success">{revokeTokenMessage}</div>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</CardBody>
		</Card>
	);
}
