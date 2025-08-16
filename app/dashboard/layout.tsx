"use client";
import "@/styles/globals.css";
import { SidebarNavigation } from "@/components/sidebar-navigation";
import { Header } from "@/components/header";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import UnAuthorizedContent from "@/components/UnAuthorizedContent";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-default-50 flex h-screen">
			{/* Sidebar */}
			<SidebarNavigation />

			{/* Main Content */}
			<main className="flex flex-1 flex-col overflow-hidden">
				<Header />

				{/* Page Content */}
				<section className="flex-1 overflow-auto">
					<SignedIn>{children}</SignedIn>

					<SignedOut>
						<div className="flex items-center justify-center h-full">
							<UnAuthorizedContent />
						</div>
					</SignedOut>
				</section>
			</main>
		</div>
	);
}
