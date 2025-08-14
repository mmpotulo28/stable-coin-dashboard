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
import axios from "axios";
import { IUser } from "@/types/users";

interface CreateUserModalProps {
	isOpen: boolean;
	onClose: () => void;
	onCreated?: (user?: IUser) => void;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN as string;

export function CreateUserModal({ isOpen, onClose, onCreated }: CreateUserModalProps) {
	const [form, setForm] = useState({
		email: "",
		firstName: "",
		lastName: "",
		role: "CUSTOMER",
		imageUrl: "https://illustrations.popsy.co/gray/man-with-short-hair-avatar.svg",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

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
		setLoading(true);
		setError(null);
		try {
			const { data } = await axios.post<IUser>(
				`${API_BASE}/users`,
				{
					email: form.email,
					firstName: form.firstName,
					lastName: form.lastName,
					role: form.role,
					imageUrl: form.imageUrl,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: API_TOKEN,
					},
				},
			);
			if (onCreated) onCreated(data);
			setForm({
				email: "",
				firstName: "",
				lastName: "",
				role: "CUSTOMER",
				imageUrl: "https://illustrations.popsy.co/gray/man-with-short-hair-avatar.svg",
			});
		} catch (err: any) {
			if (err?.response?.status === 400) {
				setError("Validation error.");
			} else if (err?.response?.status === 401) {
				setError("Unauthorized.");
			} else {
				setError("Failed to create user.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className="max-w-lg mx-auto rounded-2xl shadow-2xl bg-background">
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
						<div className="flex gap-4">
							<Input
								label="First Name"
								name="firstName"
								value={form.firstName}
								onChange={handleChange}
								isRequired
							/>
							<Input
								label="Last Name"
								name="lastName"
								value={form.lastName}
								onChange={handleChange}
								isRequired
							/>
						</div>
						<div className="flex gap-4">
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
								value={form.imageUrl}
								onChange={handleChange}
							/>
						</div>
						{error && <div className="text-danger font-medium">{error}</div>}
					</form>
				</ModalBody>
				<ModalFooter className="flex justify-end pt-2">
					<Button onPress={onClose} variant="light" className="mr-2" isDisabled={loading}>
						Cancel
					</Button>
					<Button
						color="primary"
						type="submit"
						isLoading={loading}
						onClick={handleSubmit}
						isDisabled={
							loading ||
							!form.email ||
							!form.firstName ||
							!form.lastName ||
							!form.role
						}>
						{loading ? <Spinner size="sm" /> : "Create"}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
