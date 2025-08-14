import React from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	User as HeroUser,
	Chip,
	Snippet,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { IUser } from "@/types/users";

interface UserDetailsModalProps {
	user: IUser | null;
	isOpen: boolean;
	onClose: () => void;
}

const getRole = (user: IUser) => user.role || "CUSTOMER";

export function UserDetailsModal({ user, isOpen, onClose }: UserDetailsModalProps) {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className="max-w-lg mx-auto rounded-2xl shadow-2xl bg-background">
			<ModalContent>
				<ModalHeader className="flex items-center gap-3 border-b pb-3 bg-default-50 rounded-t-2xl">
					<Icon icon="lucide:user" className="text-3xl text-primary" />
					<span className="text-xl font-bold">User Details</span>
				</ModalHeader>
				<ModalBody>
					{user && (
						<div className="space-y-6">
							<div className="flex items-center gap-4 mb-4">
								<HeroUser
									name={`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()}
									description={user.email}
									avatarProps={{
										src:
											user.imageUrl ||
											"https://img.heroui.chat/image/avatar?w=200&h=200&u=default",
										className: "w-16 h-16",
									}}
								/>
								<Chip
									color={getRole(user) === "ADMIN" ? "primary" : "default"}
									variant="flat"
									className="ml-2 text-base px-4 py-2 ">
									{getRole(user)}
								</Chip>
							</div>
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div>
									<span className="font-semibold text-default-700">User ID:</span>
									<Snippet
										hideSymbol
										variant="bordered"
										size="sm"
										className="mt-1 max-w-full overflow-auto"
										copyButtonProps={{ "aria-label": "Copy User ID" }}>
										{user.id}
									</Snippet>
								</div>
								<div>
									<span className="font-semibold text-default-700">
										Business ID:
									</span>
									<div className="text-default-500 break-all">
										{user.businessId ?? "-"}
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
										{user.paymentIdentifier ?? "-"}
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
										{user.publicKey ?? "-"}
									</Snippet>
								</div>
								<div>
									<span className="font-semibold text-default-700">
										Pay Enabled:
									</span>
									<div>
										<Chip
											color={user.enabledPay ? "success" : "danger"}
											variant="dot">
											{user.enabledPay ? "Enabled" : "Disabled"}
										</Chip>
									</div>
								</div>
								<div>
									<span className="font-semibold text-default-700">
										Created At:
									</span>
									<div className="text-default-500">
										{user.createdAt
											? new Date(user.createdAt).toLocaleString()
											: "-"}
									</div>
								</div>
								<div>
									<span className="font-semibold text-default-700">
										Updated At:
									</span>
									<div className="text-default-500">
										{user.updatedAt
											? new Date(user.updatedAt).toLocaleString()
											: "-"}
									</div>
								</div>
							</div>
						</div>
					)}
				</ModalBody>
				<ModalFooter className="flex justify-end border-t pt-3 bg-default-50 rounded-b-2xl">
					<Button
						onPress={onClose}
						color="primary"
						variant="flat"
						className="px-6 py-2 rounded-lg font-semibold">
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
