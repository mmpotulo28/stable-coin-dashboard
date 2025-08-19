"use client";
import { Button, Link, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { ThemeSwitch } from "./theme-switcher";

export function LandingHeader() {
	const router = useRouter();

	return (
		<header className="w-full px-8 py-6 flex items-center justify-between bg-default-50 backdrop-blur-xl shadow-lg  z-30">
			<Link href="/" className="flex items-center gap-3">
				<Icon icon="lucide:rocket" className="text-4xl text-primary animate-spin-slow " />
				<span className="font-extrabold text-3xl tracking-tight text-primary ">
					Stable Coin Dashboard
				</span>
			</Link>
			<div className="flex gap-4 items-center">
				<ThemeSwitch />
				<SignedIn>
					<Button
						color="primary"
						onPress={() => router.push("/dashboard")}
						startContent={<Icon icon="lucide:user-plus" />}>
						Dashboard
					</Button>
					<UserButton />
				</SignedIn>

				<SignedOut>
					<Button
						color="primary"
						onPress={() => router.push("/auth/sign-up")}
						startContent={<Icon icon="lucide:user-plus" />}>
						Get Started
					</Button>
					<SignInButton>
						<Avatar
							isBordered
							as="button"
							src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
							className="transition-transform"
						/>
					</SignInButton>
				</SignedOut>
			</div>
		</header>
	);
}
