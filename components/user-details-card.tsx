import React from "react";
import { Chip, Snippet, User as HeroUser, Card, CardHeader, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { IUser } from "@/types/users";

const getRole = (user: IUser) => user.role || "CUSTOMER";

export function UserDetailsCard({ user }: { user: IUser }) {
	return (
		<Card className="max-w-2xl bg-default-100">
			<CardHeader className="flex items-center gap-3  pb-3  rounded-t-2xl">
				<Icon icon="lucide:user" className="text-3xl text-primary" />
				<span className="text-xl font-bold">User Details</span>
			</CardHeader>
			<CardBody>
				{user && (
					<div className="space-y-6 p-4">
						<div className="flex items-center justify-between gap-4 mb-4">
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
								color={getRole(user) === "ADMIN" ? "primary" : "secondary"}
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
									className="mt-1 max-w-full overflow-auto w-full"
									copyButtonProps={{ "aria-label": "Copy User ID" }}>
									{user.id}
								</Snippet>
							</div>
							<div>
								<span className="font-semibold text-default-700">Business ID:</span>
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
									className="mt-1 max-w-full overflow-auto w-full"
									copyButtonProps={{
										"aria-label": "Copy Payment Identifier",
									}}>
									{user.paymentIdentifier ?? "-"}
								</Snippet>
							</div>
							<div>
								<span className="font-semibold text-default-700">Public Key:</span>
								<Snippet
									hideSymbol
									variant="bordered"
									size="sm"
									className="mt-1 max-w-full overflow-auto w-full"
									copyButtonProps={{ "aria-label": "Copy Public Key" }}>
									{user.publicKey ?? "-"}
								</Snippet>
							</div>
							<div>
								<span className="font-semibold text-default-700">Pay Enabled:</span>
								<div>
									<Chip
										className="mt-2"
										color={user.enabledPay ? "success" : "danger"}
										variant="bordered">
										{user.enabledPay ? "Enabled" : "Disabled"}
									</Chip>
								</div>
							</div>
							<div>
								<span className="font-semibold text-default-700">Created At:</span>
								<div className="text-default-500">
									{user.createdAt
										? new Date(user.createdAt).toLocaleString()
										: "-"}
								</div>
							</div>
							<div>
								<span className="font-semibold text-default-700">Updated At:</span>
								<div className="text-default-500">
									{user.updatedAt
										? new Date(user.updatedAt).toLocaleString()
										: "-"}
								</div>
							</div>
						</div>
					</div>
				)}
			</CardBody>
		</Card>
	);
}
