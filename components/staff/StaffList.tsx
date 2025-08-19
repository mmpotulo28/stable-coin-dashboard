import React from "react";
import { Card, CardHeader, CardBody, Chip, Button, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { IStaffMember } from "@/types/users";

export function StaffList({
	staff,
	loading,
	error,
	onRemove,
}: {
	staff: IStaffMember[];
	loading: boolean;
	error: string | null;
	onRemove: (id: string) => void;
}) {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:users" className="text-xl" />
					<span className="font-semibold">Staff Members</span>
				</div>
			</CardHeader>
			<CardBody>
				{loading ? (
					<div className="flex items-center gap-2 justify-center py-8">
						<Spinner label="Loading staff..." />
					</div>
				) : error ? (
					<div className="text-danger text-center py-8">{error}</div>
				) : staff.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-8">
						<Icon icon="lucide:users" className="text-4xl text-default-400 mb-2" />
						<div className="text-default-500 font-medium">No staff found.</div>
					</div>
				) : (
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
									onPress={() => onRemove(member.id)}>
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
