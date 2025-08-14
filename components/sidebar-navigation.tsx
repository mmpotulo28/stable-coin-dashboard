"use client";
import React from "react";
import { Link, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useSideBar } from "@/context/SideBarProvider";

const navigationItems = [
	{ name: "Dashboard", icon: "lucide:layout-dashboard", href: "/" },
	{ name: "User Management", icon: "lucide:users", href: "/views/users" },
	{ name: "Business Management", icon: "lucide:briefcase", href: "/views/business" },
	{ name: "Make Transfer", icon: "lucide:banknote", href: "/views/transfer" },
	{ name: "Blocks", icon: "lucide:boxes", href: "/views/blocks" },
	{ name: "Settings", icon: "lucide:settings", href: "/views/settings" },
];

export function SidebarNavigation() {
	const { isSidebarOpen, toggleSidebar } = useSideBar();
	return (
		<aside
			className={`bg-background border-default-200 border-r fixed lg:static top-0 left-0 h-full z-40 transition-transform duration-300 ${
				isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
			}`}>
			<div
				className={`flex flex-col h-full ${isSidebarOpen ? "w-64" : "w-16"} transition-all duration-300`}>
				<div className="flex items-center justify-between p-4">
					<div className={`flex items-center gap-2 ${isSidebarOpen ? "" : "hidden"}`}>
						<Icon icon="lucide:boxes" className="text-2xl" />
						<span className="font-bold text-xl">Dashboard</span>
					</div>
					<Button
						isIconOnly
						variant="light"
						onPress={toggleSidebar}
						className={isSidebarOpen ? "lg:hidden" : "hidden"}>
						<Icon icon="lucide:x" className="text-xl" />
					</Button>
				</div>
				<div className="flex flex-col gap-1 p-2">
					{navigationItems.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-default-100 ${
								isSidebarOpen ? "" : "justify-center"
							}`}>
							<Icon icon={item.icon} className="text-xl" />
							{isSidebarOpen && <span>{item.name}</span>}
						</Link>
					))}
				</div>
			</div>
		</aside>
	);
}
