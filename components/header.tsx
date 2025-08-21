"use client";
import { Avatar, Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import React from "react";
import { ThemeSwitch } from "./theme-switcher";
import { useSideBar } from "@/context/SideBarProvider";
import { UserButton } from "@clerk/nextjs";

export function Header() {
	const { toggleSidebar } = useSideBar();

	return (
		<header className="border-default-200 flex items-center justify-between border-b px-4 py-3">
			<div className="flex items-center gap-3">
				<Button isIconOnly variant="light" onPress={toggleSidebar} className="">
					<Icon icon="lucide:menu" className="text-2xl" />
				</Button>
				<Button isIconOnly variant="light">
					<Icon icon="lucide:search" className="text-xl" />
				</Button>
				<Link href="/docs" aria-label="Documentation">
					<Button isIconOnly variant="light">
						<Icon icon="lucide:book-open" className="text-xl" />
					</Button>
				</Link>
			</div>
			<div className="flex items-center gap-3">
				<ThemeSwitch />
				<Button isIconOnly variant="light">
					<Icon icon="lucide:bell" className="text-xl" />
				</Button>
				<UserButton
					showName
					fallback={
						<Avatar
							isBordered
							as="button"
							src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
							className="transition-transform"
						/>
					}>
					<UserButton.MenuItems>
						<UserButton.Link
							label="Settings"
							labelIcon={<Icon icon="lucide:settings" />}
							href="/dashboard/settings"
						/>
					</UserButton.MenuItems>
				</UserButton>
			</div>
		</header>
	);
}
