import React from "react";
import { Card, CardHeader, CardBody, Chip, Button, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { iStaffMember, useLiskStaff } from "@mmpotulo/stablecoin-hooks";
import { useOrganization, useUser } from "@clerk/nextjs";

export function StaffList() {
	const { user } = useUser();
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;
	const { staff, staffLoading, staffError, removeStaff, removeStaffError } = useLiskStaff({
		apiKey: `Bearer ${apiKey}`,
	});

	const handleRemove = async (id: string) => {
		if (!user?.id) return;
		await removeStaff(user.id, id);
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:users" className="text-xl" />
					<span className="font-semibold">Staff Members</span>
				</div>
			</CardHeader>
			<CardBody>
				{staffLoading && (
					<div className="flex items-center gap-2 justify-center py-8">
						<Spinner label="Loading staff..." />
					</div>
				)}

				{staffError && <div className="text-danger text-center py-8">{staffError}</div>}
				{removeStaffError && (
					<div className="text-danger text-center py-8">{removeStaffError}</div>
				)}

				{staffLoading && staff.length === 0 && (
					<div className="flex flex-col items-center justify-center py-8">
						<Icon icon="lucide:users" className="text-4xl text-default-400 mb-2" />
						<div className="text-default-500 font-medium">No staff found.</div>
					</div>
				)}

				{staff.length > 0 && (
					<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
						{staff.map((member) => (
							<Card key={member.id} className="p-4 bg-default-100 shadow rounded-xl">
								<div className="flex items-center gap-2 mb-2">
									<Icon icon="lucide:user" className="text-xl text-primary" />
									<span className="font-semibold">
										{member.firstName} {member.lastName}
									</span>
									<Chip color="secondary" variant="flat" className="ml-2">
										{member.email}
									</Chip>
								</div>
								<Button
									size="sm"
									color="danger"
									variant="bordered"
									onPress={() => handleRemove(member.id)}>
									Remove
								</Button>
							</Card>
						))}
					</div>
				)}
			</CardBody>
		</Card>
	);
}
