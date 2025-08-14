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
import { IApiToken } from "@/types/users";
import { useApiTokens } from "@/hooks/useApiTokens";

export function ApiTokenList() {
	const {
		tokens,
		loading,
		error,
		updateToken,
		updateLoading,
		updateError,
		revokeToken,
		revokeLoading,
		revokeError,
		revokeSuccess,
		fetchTokens,
	} = useApiTokens();

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
						isLoading={loading}
						aria-label="Refresh"
						className="ml-2">
						<Icon icon="lucide:refresh-cw" />
					</Button>
				</div>
			</CardHeader>
			<CardBody>
				{loading ? (
					<Spinner label="Loading tokens..." />
				) : error ? (
					<div className="text-danger">{error}</div>
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
													isLoading={updateLoading}
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
												{updateError && (
													<div className="text-danger">{updateError}</div>
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
											isLoading={revokeLoading && revokeId === token.id}
											isDisabled={token.revoked}
											onPress={async () => {
												setRevokeId(token.id);
												await revokeToken(token.id);
												setRevokeId(null);
											}}>
											<Icon icon="lucide:trash" />
											Revoke
										</Button>
										{revokeError && revokeId === token.id && (
											<div className="text-danger">{revokeError}</div>
										)}
										{revokeSuccess && revokeId === token.id && (
											<div className="text-success">{revokeSuccess}</div>
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
