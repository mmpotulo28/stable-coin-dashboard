"use client";
import React from "react";
import { Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { UserList } from "@/components/user-list";

const UsersPage = () => {
	return (
		<div className="flex-1 overflow-auto p-6">
			<h1 className="text-2xl font-semibold mb-6">User Management</h1>

			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
				<Input
					placeholder="Search users..."
					startContent={<Icon icon="lucide:search" />}
					className="max-w-xs"
				/>
				<Button color="primary">
					<Icon icon="lucide:user-plus" className="mr-2" />
					Add New User
				</Button>
			</div>

			<UserList />
		</div>
	);
};

export default UsersPage;
