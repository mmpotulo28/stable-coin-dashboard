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
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useStableCoin } from "@/context/StableCoinProvider";
import { IUser } from "@/types/users";
import { UserDetailsModal } from "@/components/user-details-modal";

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
											src:
												user.imageUrl ||
												"https://img.heroui.chat/image/avatar?w=200&h=200&u=default",
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
								<button
									type="button"
									aria-label="View user details"
									onClick={() => handleUserClick(user)}
									className="p-2 rounded-md hover:bg-default-100">
									<Icon icon="lucide:eye" className="text-xl" />
								</button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<UserDetailsModal user={selectedUser} isOpen={isModalOpen} onClose={closeModal} />
		</>
	);
}
