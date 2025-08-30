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
import { Icon } from "@iconify/react";
import { useOrganization } from "@clerk/nextjs";
import { iUser, useLiskUsers } from "@mmpotulo/stablecoin-hooks";

interface UpdateUserModalProps {
	user: iUser | null;
	isOpen: boolean;
	onClose: () => void;
	onUpdated?: () => void;
}

export function UpdateUserModal({ user, isOpen, onClose, onUpdated }: UpdateUserModalProps) {
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;
	const { updateUser, updateUserError, updateUserLoading, updateUserMessage } = useLiskUsers({
		apiKey,
	});

	const [form, setForm] = useState({
		email: user?.email ?? "",
		firstName: user?.firstName ?? "",
		lastName: user?.lastName ?? "",
		imageUrl: user?.imageUrl ?? "",
	});

	React.useEffect(() => {
		setForm({
			email: user?.email ?? "",
			firstName: user?.firstName ?? "",
			lastName: user?.lastName ?? "",
			imageUrl: user?.imageUrl ?? "",
		});
	}, [user, isOpen]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		console.log("Submitting form:", e.target);
		e.preventDefault();
		if (!user) return;

		const { email, firstName, lastName, imageUrl } = form;
		await updateUser(user.id, { email, firstName, lastName, imageUrl });

		if (onUpdated) onUpdated();
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

							<Button onPress={onClose} variant="light" className="mr-2">
								Cancel
							</Button>
							<Button
								color="primary"
								type="submit"
								isLoading={updateUserLoading}
								isDisabled={updateUserLoading || !user}>
								{updateUserLoading ? <Spinner size="sm" /> : "Update"}
							</Button>
						</form>
					)}
				</ModalBody>
				<ModalFooter className="flex justify-end  pt-2">
					{updateUserMessage && (
						<div className="mb-4 text-sm text-success-500">{updateUserMessage}</div>
					)}
					{updateUserError && (
						<div className="mb-4 text-sm text-danger">{updateUserError}</div>
					)}
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
