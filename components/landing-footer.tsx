"use client";
import { Link } from "@heroui/react";
import { Icon } from "@iconify/react";

export function LandingFooter() {
	return (
		<footer className="w-full py-8 mt-auto bg-background flex flex-col items-center gap-2 backdrop-blur-xl">
			<div className="flex gap-2 items-center">
				<Icon icon="lucide:rocket" className="text-2xl text-primary animate-spin-slow" />
				<span className="font-semibold text-default-200">Stable Coin Dashboard</span>
				<span className="text-xs text-default-400">&copy; 2024</span>
			</div>
			<div className="text-xs text-default-400">
				Built with Next.js, HeroUI, and TypeScript. |{" "}
				<Link href="/docs" color="primary">
					Docs
				</Link>
			</div>
		</footer>
	);
}
