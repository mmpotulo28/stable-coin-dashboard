"use client";
import React, { useEffect, useState } from "react";
import { useStaff } from "@/hooks/useStaff";
import { useUser } from "@clerk/nextjs";
import { AssignStaffForm } from "@/components/staff/AssignStaffForm";
import { StaffList } from "@/components/staff/StaffList";

import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import OrgProPlanProvider from "@/context/OrgRequiredProvider";

export default function StaffPage() {
	const { user } = useUser();
	const { staff, loading, error, actionMsg, fetchStaff, assignStaff, removeStaff, setActionMsg } =
		useStaff();

	useEffect(() => {
		fetchStaff(user?.id || "");
	}, [user?.id]);

	useEffect(() => {
		if (actionMsg) {
			const timer = setTimeout(() => setActionMsg(null), 3000);
			return () => clearTimeout(timer);
		}
	}, [actionMsg, setActionMsg]);

	const handleAssign = async (input: string) => {
		if (!user?.id) return;
		await assignStaff(user.id, input);
	};

	const handleRemove = async (id: string) => {
		if (!user?.id) return;
		await removeStaff(user.id, id);
	};

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
						isLoading={loading}
						onPress={() => fetchStaff(user?.id || "")}
						isDisabled={loading}>
						<Icon icon="lucide:refresh-cw" />
					</Button>
				</div>

				{actionMsg && <div className="text-success text-center mb-4">{actionMsg}</div>}
				<AssignStaffForm onAssign={handleAssign} loading={loading} />
				<StaffList staff={staff} loading={loading} error={error} onRemove={handleRemove} />
			</div>
		</OrgProPlanProvider>
	);
}
