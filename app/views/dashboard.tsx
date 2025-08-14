import { StatsCard } from "@/components/stats-card";
import { UserList } from "@/components/users/user-list";
import React from "react";

export function Dashboard() {
	return (
		<div className="flex-1 overflow-auto p-6">
			<div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatsCard
					title="Total Users"
					value="1,234"
					icon="lucide:users"
					change="+10% from last month"
					isPositive
				/>
				<StatsCard
					title="Active Users"
					value="987"
					change="+5.2% from last month"
					isPositive={true}
					icon="lucide:user-check"
				/>
				<StatsCard
					title="New Users (This Month)"
					value="56"
					icon="lucide:user-plus"
					isPositive={true}
					change="+8.3% from last month"
				/>
				<StatsCard
					title="Pay-Enabled Users"
					value="723"
					change="+12.5% from last month"
					isPositive={true}
					icon="lucide:wallet"
				/>
			</div>

			<div className="mb-6">
				<h2 className="text-2xl font-semibold mb-4">Recent Users</h2>
				<UserList limit={5} />
			</div>
		</div>
	);
}
