"use client";
import type { ThemeProviderProps } from "next-themes";
import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ToastProvider } from "@heroui/react";
import { SideBarProvider } from "@/context/SideBarProvider";
import { useEffect, useState } from "react";
import { useUser, ClerkProvider } from "@clerk/nextjs";
import OnboardingModal from "@/components/onboarding-modal";

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
	interface RouterConfig {
		routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
	}
}

function OnboardingCheck({ children }: { children: React.ReactNode }) {
	const { user, isLoaded } = useUser();
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (!isLoaded || !user) return;
		const skipUntil = localStorage.getItem("onboarding_skip_until");
		const skipActive = skipUntil && Date.now() < Number(skipUntil);

		const meta = user.unsafeMetadata || {};
		const needsOnboarding =
			!meta.onboarded || !meta.apiToken || !meta.businessName || !meta.businessDesc;

		setTimeout(() => {
			setShowModal(!skipActive && needsOnboarding);
		}, 1000);
	}, [user, isLoaded]);

	if (showModal && user) {
		return (
			<>
				{children}
				<OnboardingModal user={user} onComplete={() => setShowModal(false)} />
			</>
		);
	}

	return <>{children}</>;
}

export function Providers({ children, themeProps }: ProvidersProps) {
	const router = useRouter();

	return (
		<ClerkProvider
			appearance={{
				variables: {
					colorBackground: "hsl(var(--heroui-background) / 1)",
					colorText: "hsl(var(--heroui-foreground) / 1)",
					colorBorder: "hsl(var(--heroui-default-500) / 1)",
					colorPrimary: "hsl(var(--heroui-primary) / 1)",
					colorSuccess: "hsl(var(--heroui-success) / 1)",
					colorWarning: "hsl(var(--heroui-warning) / 1)",
					colorDanger: "hsl(var(--heroui-danger) / 1)",
					colorTextSecondary: "hsl(var(--heroui-secondary) / 1)",
					colorNeutral: "hsl(var(--heroui-text) / 1)",
					colorForeground: "hsl(var(--heroui-text) / 1)",
					colorInput: "hsl(var(--heroui-background) / 1)",
					colorInputForeground: "hsl(var(--heroui-text) / 1)",
					colorMutedForeground: "hsl(var(--heroui-muted) / 1)",
					colorModalBackdrop: "hsl(var(--heroui-background) / 1)",
					colorMuted: "hsl(var(--heroui-default) / 1)",
				},
			}}
			signInUrl="/auth/sign-in"
			signUpUrl="/auth/sign-up"
			afterSignOutUrl="/"
			signInFallbackRedirectUrl="/dashboard"
			signUpFallbackRedirectUrl="/dashboard">
			<HeroUIProvider navigate={router.push}>
				<NextThemesProvider {...themeProps}>
					<ToastProvider />
					<SideBarProvider>
						<OnboardingCheck>{children}</OnboardingCheck>
					</SideBarProvider>
				</NextThemesProvider>
			</HeroUIProvider>
		</ClerkProvider>
	);
}
