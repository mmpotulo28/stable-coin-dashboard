import React, { useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Spinner,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { IUser } from "@/types/users";
import axios from "axios";

interface DeleteUserModalProps {
	user: IUser | null;
	isOpen: boolean;
	onClose: () => void;
	onDeleted?: () => void;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN as string;

export function DeleteUserModal({ user, isOpen, onClose, onDeleted }: DeleteUserModalProps) {
	const [deleting, setDeleting] = useState(false);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	const handleDelete = async () => {
		if (!user) return;
		setDeleting(true);
		setDeleteError(null);
		try {
			await axios.delete(`${API_BASE}/users/${user.id}`, {
				headers: { Authorization: API_TOKEN },
			});
			onClose();
			if (onDeleted) onDeleted();
		} catch (err: any) {
			if (err?.response?.status === 400) {
				setDeleteError("Invalid user ID.");
			} else if (err?.response?.status === 401) {
				setDeleteError("Unauthorized.");
			} else {
				setDeleteError("Failed to delete user.");
			}
		} finally {
			setDeleting(false);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className="max-w-md mx-auto rounded-2xl shadow-2xl bg-background">
			<ModalContent>
				<ModalHeader className="flex items-center gap-2 pb-2">
					<Icon icon="lucide:trash-2" className="text-2xl text-danger" />
					<span className="text-lg font-semibold text-danger">Delete User</span>
				</ModalHeader>
				<ModalBody>
					{user && (
						<div className="space-y-2">
							<p>
								Are you sure you want to delete user{" "}
								<span className="font-bold">{user.email}</span>?
							</p>
							<p className="text-default-500 text-sm">
								This action cannot be undone.
							</p>
							{deleteError && (
								<div className="text-danger font-medium mt-2">{deleteError}</div>
							)}
						</div>
					)}
				</ModalBody>
				<ModalFooter className="flex justify-end pt-2">
					<Button
						onPress={onClose}
						variant="light"
						className="mr-2"
						isDisabled={deleting}>
						Cancel
					</Button>
					<Button
						color="danger"
						isLoading={deleting}
						onPress={handleDelete}
						isDisabled={deleting || !user}>
						{deleting ? <Spinner size="sm" /> : "Delete"}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
