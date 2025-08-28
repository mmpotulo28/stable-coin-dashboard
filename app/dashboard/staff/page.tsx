"use client";
import React, { useEffect, useState } from "react";

import { useOrganization, useUser } from "@clerk/nextjs";
import { AssignStaffForm } from "@/components/staff/AssignStaffForm";
import { StaffList } from "@/components/staff/StaffList";

import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import OrgProPlanProvider from "@/context/OrgRequiredProvider";
import { useLiskStaff } from "@mmpotulo/stablecoin-hooks";

export default function StaffPage() {
	const { user } = useUser();
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;
	const { staffLoading, fetchStaff } = useLiskStaff({ apiKey });

	useEffect(() => {
		fetchStaff(user?.id || "");
	}, [user?.id]);

	return (
		<OrgProPlanProvider>
			<div className="flex-1 overflow-auto p-6 space-y-8">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-semibold flex items-center gap-2">
						<Icon icon="lucide:users" />
						Staff Management
					</h1>
					<Button
						isIconOnly
						color="secondary"
						variant="bordered"
						aria-label="Refresh staff"
						isLoading={staffLoading}
						onPress={() => fetchStaff(user?.id || "")}
						isDisabled={staffLoading}>
						<Icon icon="lucide:refresh-cw" />
					</Button>
				</div>

				<AssignStaffForm />
				<StaffList />
			</div>
		</OrgProPlanProvider>
	);
}
