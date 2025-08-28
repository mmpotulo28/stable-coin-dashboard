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
import axios from "axios";
import { useOrganization } from "@clerk/nextjs";
import { iUser, useLiskUsers } from "@mmpotulo/stablecoin-hooks";

interface DeleteUserModalProps {
	user: iUser | null;
	isOpen: boolean;
	onClose: () => void;
	onDeleted?: () => void;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;

export function DeleteUserModal({ user, isOpen, onClose, onDeleted }: DeleteUserModalProps) {
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;
	const { deleteUser, deleteUserError, deleteUserLoading, deleteUserMessage } = useLiskUsers({
		apiKey: `Bearer ${apiKey}`,
	});

	const handleDelete = async () => {
		if (!user) return;

		await deleteUser(user.id);
		onClose();
		if (onDeleted) onDeleted();
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className="max-w-md mx-auto rounded-2xl shadow-2xl bg-default-50">
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
							{deleteUserError && (
								<div className="text-danger font-medium mt-2">
									{deleteUserError}
								</div>
							)}
						</div>
					)}
				</ModalBody>
				<ModalFooter className="flex justify-end pt-2">
					<Button
						onPress={onClose}
						variant="light"
						className="mr-2"
						isDisabled={deleteUserLoading}>
						Cancel
					</Button>
					<Button
						color="danger"
						isLoading={deleteUserLoading}
						onPress={handleDelete}
						isDisabled={deleteUserLoading || !user}>
						{deleteUserLoading ? <Spinner size="sm" /> : "Delete"}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
