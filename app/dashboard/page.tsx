"use client";
import { StatsCard } from "@/components/stats-card";
import { UserList } from "@/components/users/user-list";
import React from "react";
import { Card, CardHeader, CardBody, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { DashboardChart } from "@/components/DashboardChart";
import { revenueData, salesData, userGrowthData } from "@/lib/data";

const Dashboard = () => {
	return (
		<div className="flex-1 p-6 space-y-8">
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

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
				<DashboardChart
					title="Sales Overview"
					icon="lucide:bar-chart-3"
					data={salesData}
					xAxisKey="month"
					chartKey="sales"
					color="#006FEE"
					height={300}
				/>

				<DashboardChart
					title="User Growth"
					icon="lucide:activity"
					data={userGrowthData}
					xAxisKey="month"
					chartKey="users"
					color="#22C55E"
					height={300}
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
				<DashboardChart
					title="App Revenue Trend"
					icon="lucide:trending-up"
					data={revenueData}
					xAxisKey="month"
					chartKey="revenue"
					color="#F59E42"
					height={300}
				/>

				<Card className="h-[400px]">
					<CardHeader className="flex items-center gap-2">
						<Icon icon="lucide:pie-chart" className="text-xl text-primary" />
						<span className="font-semibold">Engagement Insights</span>
					</CardHeader>
					<CardBody>
						<div className="flex items-center justify-center h-full text-default-400 text-lg">
							Coming soon: Engagement Insights Chart
						</div>
					</CardBody>
				</Card>
			</div>

			<Divider />

			<div className="mb-6">
				<h2 className="text-2xl font-semibold mb-4">Recent Users</h2>
				<UserList limit={5} />
			</div>
		</div>
	);
};

export default Dashboard;
