import React, { useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Avatar,
	Spinner,
} from "@heroui/react";
import { IUser } from "@/types/users";
import { Icon } from "@iconify/react";
import axios from "axios";

interface UpdateUserModalProps {
	user: IUser | null;
	isOpen: boolean;
	onClose: () => void;
	onUpdated?: () => void;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN as string;

export function UpdateUserModal({ user, isOpen, onClose, onUpdated }: UpdateUserModalProps) {
	const [form, setForm] = useState({
		email: user?.email ?? "",
		firstName: user?.firstName ?? "",
		lastName: user?.lastName ?? "",
		imageUrl: user?.imageUrl ?? "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	React.useEffect(() => {
		setForm({
			email: user?.email ?? "",
			firstName: user?.firstName ?? "",
			lastName: user?.lastName ?? "",
			imageUrl: user?.imageUrl ?? "",
		});
		setError(null);
	}, [user, isOpen]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!user) return;
		setLoading(true);
		setError(null);
		try {
			const { data } = await axios.put<IUser>(
				`${API_BASE}/users/${user.id}`,
				{
					email: form.email,
					firstName: form.firstName,
					lastName: form.lastName,
					imageUrl: form.imageUrl,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: API_TOKEN,
					},
				},
			);
			if (onUpdated) onUpdated();
			onClose();
		} catch (err: any) {
			if (err?.response?.status === 400) {
				setError("Validation error.");
			} else if (err?.response?.status === 401) {
				setError("Unauthorized.");
			} else if (err?.response?.status === 404) {
				setError("User not found.");
			} else {
				setError("Failed to update user.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className="max-w-lg mx-auto rounded-2xl shadow-2xl bg-default-50">
			<ModalContent>
				<ModalHeader className="flex items-center gap-3  pb-3 bg-default-50 rounded-t-2xl">
					<Icon icon="lucide:pencil" className="text-2xl text-primary" />
					<span className="text-lg font-semibold">Update User</span>
				</ModalHeader>
				<ModalBody>
					{user && (
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="flex items-center gap-4">
								<Avatar
									src={
										form.imageUrl ||
										user.imageUrl ||
										"https://img.heroui.chat/image/avatar?w=200&h=200&u=default"
									}
									className="w-14 h-14"
								/>
								<div>
									<div className="font-semibold">{user.email}</div>
									<div className="text-xs text-default-400">
										User ID: {user.id}
									</div>
								</div>
							</div>
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
									value={form.firstName ?? ""}
									onChange={handleChange}
								/>
								<Input
									label="Last Name"
									name="lastName"
									value={form.lastName ?? ""}
									onChange={handleChange}
								/>
							</div>
							<Input
								label="Image URL"
								name="imageUrl"
								value={form.imageUrl ?? ""}
								onChange={handleChange}
							/>
							{error && <div className="text-danger font-medium">{error}</div>}
						</form>
					)}
				</ModalBody>
				<ModalFooter className="flex justify-end  pt-2">
					<Button onPress={onClose} variant="light" className="mr-2">
						Cancel
					</Button>
					<Button
						color="primary"
						type="submit"
						isLoading={loading}
						onClick={(e) => handleSubmit(e)}
						isDisabled={loading || !user}>
						{loading ? <Spinner size="sm" /> : "Update"}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
