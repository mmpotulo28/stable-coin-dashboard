import React, { useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Spinner,
	Select,
	SelectItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { iUser, useLiskUsers } from "@mmpotulo/stablecoin-hooks";
import { useOrganization } from "@clerk/nextjs";

interface CreateUserModalProps {
	isOpen: boolean;
	onClose: () => void;
	onCreated?: (user?: iUser) => void;
}

export function CreateUserModal({ isOpen, onClose, onCreated }: CreateUserModalProps) {
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;
	const { createUser, usersError, usersLoading, singleUser } = useLiskUsers({ apiKey });

	const [form, setForm] = useState<iUser>({
		email: "",
		firstName: "",
		lastName: "",
		role: "CUSTOMER",
		imageUrl: "https://illustrations.popsy.co/gray/man-with-short-hair-avatar.svg",
		enabledPay: false,
		businessId: "",
		createdAt: new Date().toISOString(),
		id: "",
		paymentIdentifier: "",
		publicKey: "",
		updatedAt: new Date().toISOString(),
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const user = await createUser(form);
		onCreated?.(user as iUser);
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className="max-w-lg mx-auto rounded-2xl shadow-2xl bg-default-50">
			<ModalContent>
				<ModalHeader className="flex items-center gap-3 pb-3 bg-default-50 rounded-t-2xl">
					<Icon icon="lucide:user-plus" className="text-2xl text-primary" />
					<span className="text-lg font-semibold">Create User</span>
				</ModalHeader>
				<ModalBody>
					<form onSubmit={handleSubmit} className="space-y-6 py-3">
						<Input
							label="Email"
							name="email"
							type="email"
							value={form.email}
							onChange={handleChange}
							isRequired
						/>
						<div className="flex gap-4 sm:flex-col">
							<Input
								label="First Name"
								name="firstName"
								value={form.firstName as string}
								onChange={handleChange}
								isRequired
							/>
							<Input
								label="Last Name"
								name="lastName"
								value={form.lastName as string}
								onChange={handleChange}
								isRequired
							/>
						</div>
						<div className="flex gap-4 sm:flex-col">
							<Select
								name="role"
								value={form.role}
								label="Role"
								onChange={handleSelectChange}>
								<SelectItem key="CUSTOMER">CUSTOMER</SelectItem>
								<SelectItem key="ADMIN">ADMIN</SelectItem>
								<SelectItem key="USER">USER</SelectItem>
							</Select>
							<Input
								label="Image URL"
								name="imageUrl"
								value={form.imageUrl as string}
								onChange={handleChange}
							/>
						</div>

						<Button
							onPress={onClose}
							variant="light"
							className="mr-2"
							isDisabled={usersLoading}>
							Cancel
						</Button>
						<Button
							color="primary"
							type="submit"
							isLoading={usersLoading}
							isDisabled={
								usersLoading ||
								!form.email ||
								!form.firstName ||
								!form.lastName ||
								!form.role
							}>
							{usersLoading ? <Spinner size="sm" /> : "Create"}
						</Button>

						{usersError && <div className="text-danger font-medium">{usersError}</div>}
					</form>
				</ModalBody>
				<ModalFooter className="flex justify-end pt-2"></ModalFooter>
			</ModalContent>
		</Modal>
	);
}
