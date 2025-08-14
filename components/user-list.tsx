"use client";
import React, { useState } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	User,
	Chip,
	Spinner,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Snippet,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useStableCoin } from "@/context/StableCoinProvider";
import { IUser } from "@/types/users";

export function UserList({ limit = 10 }) {
	const { users, loadingUsers, errorUsers } = useStableCoin();
	const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const getRole = (user: IUser) => user.role || "CUSTOMER";

	const handleUserClick = (user: IUser) => {
		setSelectedUser(user);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedUser(null);
	};

	if (loadingUsers) {
		return (
			<div className="flex justify-center items-center py-8">
				<Spinner label="Loading users..." />
			</div>
		);
	}

	if (errorUsers) {
		return (
			<div className="flex justify-center items-center py-8 text-danger">{errorUsers}</div>
		);
	}

	const displayUsers = users.slice(0, limit);

	return (
		<>
			<Table aria-label="User list" removeWrapper>
				<TableHeader>
					<TableColumn>USER</TableColumn>
					<TableColumn>ROLE</TableColumn>
					<TableColumn>PAY ENABLED</TableColumn>
					<TableColumn>CREATED AT</TableColumn>
					<TableColumn>ACTIONS</TableColumn>
				</TableHeader>
				<TableBody>
					{displayUsers.map((user) => (
						<TableRow key={user.id}>
							<TableCell>
								<button
									type="button"
									className="w-full text-left"
									onClick={() => handleUserClick(user)}>
									<User
										name={`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()}
										description={user.email}
										avatarProps={{
											src: `https://img.heroui.chat/image/avatar?w=200&h=200&u=${user.id}`,
										}}
									/>
								</button>
							</TableCell>
							<TableCell>
								<Chip
									color={getRole(user) === "ADMIN" ? "primary" : "default"}
									variant="flat">
									{getRole(user)}
								</Chip>
							</TableCell>
							<TableCell>
								<Chip color={user.enabledPay ? "success" : "danger"} variant="dot">
									{user.enabledPay ? "Enabled" : "Disabled"}
								</Chip>
							</TableCell>
							<TableCell>
								{user.createdAt
									? new Date(user.createdAt).toLocaleDateString()
									: "-"}
							</TableCell>
							<TableCell>
								<Button
									isIconOnly
									variant="light"
									size="sm"
									aria-label="View user details"
									onPress={() => handleUserClick(user)}
									className="hover:bg-default-100">
									<Icon icon="lucide:eye" className="text-xl" />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				className="max-w-lg mx-auto rounded-2xl shadow-2xl bg-background">
				<ModalContent>
					<ModalHeader className="flex items-center gap-3 border-b pb-3 bg-default-50 rounded-t-2xl">
						<Icon icon="lucide:user" className="text-3xl text-primary" />
						<span className="text-xl font-bold">User Details</span>
					</ModalHeader>
					<ModalBody>
						{selectedUser && (
							<div className="space-y-6">
								<div className="flex items-center gap-4 mb-4">
									<User
										name={`${selectedUser.firstName ?? ""} ${selectedUser.lastName ?? ""}`.trim()}
										description={selectedUser.email}
										avatarProps={{
											src: `https://img.heroui.chat/image/avatar?w=200&h=200&u=${selectedUser.id}`,
											className: "w-16 h-16",
										}}
									/>
									<Chip
										color={
											getRole(selectedUser) === "ADMIN"
												? "primary"
												: "default"
										}
										variant="flat"
										className="ml-2 text-base px-4 py-2 ">
										{getRole(selectedUser)}
									</Chip>
								</div>
								<div className="grid grid-cols-2 gap-4 text-sm">
									<div>
										<span className="font-semibold text-default-700">
											User ID:
										</span>
										<Snippet
											hideSymbol
											variant="bordered"
											size="sm"
											className="mt-1 max-w-full overflow-auto"
											copyButtonProps={{ "aria-label": "Copy User ID" }}>
											{selectedUser.id}
										</Snippet>
									</div>
									<div>
										<span className="font-semibold text-default-700">
											Business ID:
										</span>
										<div className="text-default-500 break-all">
											{selectedUser.businessId ?? "-"}
										</div>
									</div>
									<div>
										<span className="font-semibold text-default-700">
											Payment Identifier:
										</span>
										<Snippet
											hideSymbol
											variant="bordered"
											size="sm"
											className="mt-1 max-w-full overflow-auto"
											copyButtonProps={{
												"aria-label": "Copy Payment Identifier",
											}}>
											{selectedUser.paymentIdentifier ?? "-"}
										</Snippet>
									</div>
									<div>
										<span className="font-semibold text-default-700">
											Public Key:
										</span>
										<Snippet
											hideSymbol
											variant="bordered"
											size="sm"
											className="mt-1 max-w-full overflow-auto"
											copyButtonProps={{ "aria-label": "Copy Public Key" }}>
											{selectedUser.publicKey ?? "-"}
										</Snippet>
									</div>
									<div>
										<span className="font-semibold text-default-700">
											Pay Enabled:
										</span>
										<div>
											<Chip
												color={
													selectedUser.enabledPay ? "success" : "danger"
												}
												variant="dot">
												{selectedUser.enabledPay ? "Enabled" : "Disabled"}
											</Chip>
										</div>
									</div>
									<div>
										<span className="font-semibold text-default-700">
											Created At:
										</span>
										<div className="text-default-500">
											{selectedUser.createdAt
												? new Date(selectedUser.createdAt).toLocaleString()
												: "-"}
										</div>
									</div>
									<div>
										<span className="font-semibold text-default-700">
											Updated At:
										</span>
										<div className="text-default-500">
											{selectedUser.updatedAt
												? new Date(selectedUser.updatedAt).toLocaleString()
												: "-"}
										</div>
									</div>
								</div>
							</div>
						)}
					</ModalBody>
					<ModalFooter className="flex justify-end border-t pt-3 bg-default-50 rounded-b-2xl">
						<Button
							onPress={closeModal}
							color="primary"
							variant="flat"
							className="px-6 py-2 rounded-lg font-semibold">
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
