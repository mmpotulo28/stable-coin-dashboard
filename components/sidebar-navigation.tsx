"use client";
import React from "react";
import { Link, Button, User, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useSideBar } from "@/context/SideBarProvider";
import { useUser, SignedIn, OrganizationSwitcher } from "@clerk/nextjs";

const navigationItems = [
	{ name: "Dashboard", icon: "lucide:layout-dashboard", href: "/dashboard" },
	{ name: "User Management", icon: "lucide:users", href: "/dashboard/users" },
	{ name: "Business Management", icon: "lucide:briefcase", href: "/dashboard/business" },
	{ name: "Make Transfer", icon: "lucide:banknote", href: "/dashboard/transfer", pro: true },
	{ name: "Transactions", icon: "lucide:repeat", href: "/dashboard/transactions" },
	{ name: "API Tokens", icon: "lucide:key", href: "/dashboard/api-tokens" },
	{ name: "Charges", icon: "lucide:link", href: "/dashboard/charges", pro: true },
	{ name: "Blocks", icon: "lucide:boxes", href: "/dashboard/blocks" },
	{ name: "Settings", icon: "lucide:settings", href: "/dashboard/settings" },
];

export function SidebarNavigation() {
	const { isSidebarOpen, toggleSidebar } = useSideBar();
	const { user } = useUser();

	return (
		<aside
			className={`fixed lg:static top-0 left-0 h-full z-40 transition-all duration-300 bg-gradient-to-br from-default-50 to-default-100 border-r border-default-200 shadow-lg ${
				isSidebarOpen ? "w-64" : "w-20"
			} flex flex-col`}>
			{/* Logo & Collapse Button */}
			<div className="flex items-center justify-between px-4 py-5 border-b border-default-200">
				<Link href="/" className="flex items-center gap-2">
					<Icon icon="lucide:rocket" className="text-2xl text-primary" />
					{isSidebarOpen && (
						<span className="font-bold text-xl tracking-tight text-primary">
							StableCoin
						</span>
					)}
				</Link>
				<Button
					isIconOnly
					variant="light"
					onPress={toggleSidebar}
					className="lg:hidden"
					aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}>
					<Icon
						icon={isSidebarOpen ? "lucide:chevron-left" : "lucide:chevron-right"}
						className="text-xl"
					/>
				</Button>
			</div>
			{/* Navigation */}
			<nav className="flex-1 flex flex-col gap-1 py-4 px-2">
				{navigationItems.map((item) => (
					<Link
						key={item.name}
						href={item.href}
						className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 hover:bg-primary/10 hover:text-primary ${
							isSidebarOpen ? "justify-start" : "justify-center"
						} text-default-700 font-medium`}>
						<Icon
							icon={item.icon}
							className="text-xl group-hover:text-primary transition-colors"
						/>
						{isSidebarOpen && (
							<>
								<span className="text-nowrap">{item.name}</span>
								{item.pro && (
									<Chip
										color="secondary"
										variant="bordered"
										size="sm"
										className="ml-2 px-2 py-0 text-xs font-bold">
										PRO
									</Chip>
								)}
							</>
						)}
					</Link>
				))}
			</nav>
			{/* Footer */}
			<div className="mt-auto px-4 py-4 border-t border-default-200 flex flex-col items-center gap-2">
				<SignedIn>
					<OrganizationSwitcher />
				</SignedIn>
			</div>
		</aside>
	);
}
