"use client";
import React, { useEffect, useState } from "react";
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
	Alert,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { UserDetailsModal } from "@/components/users/user-details-modal";
import { UpdateUserModal } from "@/components/users/update-user-modal";
import { DeleteUserModal } from "@/components/users/delete-user-modal";
import { iUser, useLiskUsers } from "@mmpotulo/stablecoin-hooks";
import { useOrganization } from "@clerk/nextjs";

export function UserList({ limit = 10 }) {
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;
	const { fetchUsers, usersError, usersLoading, users } = useLiskUsers({ apiKey });
	const [selectedUser, setSelectedUser] = useState<iUser | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	useEffect(() => {
		fetchUsers();
	}, []);

	const getRole = (user: iUser) => user.role || "CUSTOMER";

	const handleUserClick = (user: iUser) => {
		setSelectedUser(user);
		setIsModalOpen(true);
	};

	const handleUpdateClick = (user: iUser) => {
		setSelectedUser(user);
		setIsUpdateModalOpen(true);
	};

	const handleDeleteClick = (user: iUser) => {
		setSelectedUser(user);
		setIsDeleteModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedUser(null);
	};

	const closeUpdateModal = () => {
		setIsUpdateModalOpen(false);
		setSelectedUser(null);
	};

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false);
		setSelectedUser(null);
	};

	if (usersLoading) {
		return (
			<div className="flex justify-center items-center py-8">
				<Spinner label="Loading users..." />
			</div>
		);
	}

	if (usersError) {
		return <Alert title="Error" description={usersError} variant="bordered" color="danger" />;
	}

	const displayUsers = users.slice(0, limit);

	return (
		<div className="w-full max-w-full overflow-auto">
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
								<User
									name={`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()}
									description={user.email}
									avatarProps={{
										src:
											user.imageUrl ||
											"https://img.heroui.chat/image/avatar?w=200&h=200&u=default",
									}}
								/>
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
								<div className="flex gap-2">
									<button
										type="button"
										aria-label="View user details"
										onClick={() => handleUserClick(user)}
										className="p-2 rounded-md hover:bg-default-100">
										<Icon icon="lucide:eye" className="text-xl" />
									</button>
									<button
										type="button"
										aria-label="Update user"
										onClick={() => handleUpdateClick(user)}
										className="p-2 rounded-md hover:bg-default-100 text-primary">
										<Icon icon="lucide:pencil" className="text-xl" />
									</button>
									<button
										type="button"
										aria-label="Delete user"
										onClick={() => handleDeleteClick(user)}
										className="p-2 rounded-md hover:bg-danger-100 text-danger">
										<Icon icon="lucide:trash-2" className="text-xl" />
									</button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<UserDetailsModal user={selectedUser} isOpen={isModalOpen} onClose={closeModal} />
			<UpdateUserModal
				user={selectedUser}
				isOpen={isUpdateModalOpen}
				onClose={closeUpdateModal}
				onUpdated={fetchUsers}
			/>
			<DeleteUserModal
				user={selectedUser}
				isOpen={isDeleteModalOpen}
				onClose={closeDeleteModal}
				onDeleted={fetchUsers}
			/>
		</div>
	);
}
