"use client";
import type { ThemeProviderProps } from "next-themes";
import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ToastProvider } from "@heroui/react";
import { SideBarProvider } from "@/context/SideBarProvider";
import { useEffect, useState } from "react";
import { useUser, ClerkProvider, useOrganization } from "@clerk/nextjs";
import OnboardingModal from "@/components/onboarding-modal";
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { AgentOptions } from "@newrelic/browser-agent/loaders/agent";

let BrowserAgent: typeof import("@newrelic/browser-agent/loaders/browser-agent").BrowserAgent;

if (typeof window !== "undefined") {
	import("@newrelic/browser-agent/loaders/browser-agent").then((mod) => {
		BrowserAgent = mod.BrowserAgent;

		// The agent loader code executes immediately on instantiation.
		const options: AgentOptions = {
			info: {
				applicationID: process.env.NEXT_PUBLIC_NEW_RELIC_APPLICATION_ID || "",
				beacon: "bam.nr-data.net",
				errorBeacon: "bam.nr-data.net",
				licenseKey: process.env.NEXT_PUBLIC_NEW_RELIC_LICENSE_KEY || "",
				sa: 1,
			},
			init: {
				ajax: {
					deny_list: ["bam.nr-data.net"],
				},
				distributed_tracing: {
					allowed_origins: [],
					cors_use_newrelic_header: true,
					cors_use_tracecontext_headers: true,
					enabled: true,
					exclude_newrelic_header: false,
				},

				privacy: {
					cookies_enabled: true,
				},

				session_replay: {
					autoStart: true,
					block_selector: "",
					collect_fonts: true,
					enabled: true,
					error_sampling_rate: 100,
					fix_stylesheets: true,
					inline_images: false,
					mask_all_inputs: true,
					mask_input_options: {},
					mask_text_selector: "*",
					preload: false,
					sampling_rate: 10,
				},
			},
			loader_config: {
				accountID: process.env.NEXT_PUBLIC_NEW_RELIC_ACCOUNT_ID,
				agentID: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_AGENT_ID,
				applicationID: process.env.NEXT_PUBLIC_NEW_RELIC_APPLICATION_ID,
				licenseKey: process.env.NEXT_PUBLIC_NEW_RELIC_LICENSE_KEY,
				trustKey: process.env.NEXT_PUBLIC_NEW_RELIC_TRUST_KEY,
			},
		};
		new BrowserAgent(options);
	});
}

// Utility: check if org is on pro plan
export function useOrgProPlan() {
	const { organization } = useOrganization();
	const [isPro, setIsPro] = useState(true);

	useEffect(() => {
		async function checkProPlan() {
			const subscriptions = await organization?.getSubscriptions();
			const IsPro =
				subscriptions?.data.some(
					(sub) => sub.status === "active" && sub.plan?.name === "Pro",
				) || false;
			setIsPro(IsPro);

			console.log("Is Pro Plan:", IsPro, subscriptions);
		}
		checkProPlan();
	}, [organization]);

	return isPro;
}

// Upgrade prompt component
export function OrgProRequired({ children }: { children: React.ReactNode }) {
	const isPro = useOrgProPlan();
	const router = useRouter();

	if (!isPro) {
		return (
			<Card className="max-w-lg mx-auto mt-24 shadow-2xl border border-warning">
				<CardBody className="flex flex-col items-center gap-6 p-8">
					<Icon icon="lucide:lock" className="text-warning text-4xl" />
					<div className="text-xl font-bold text-warning text-center">
						This feature requires the <span className="text-primary">Pro Plan</span>
					</div>
					<div className="text-default-500 text-center text-sm">
						Upgrade your organization to unlock this page.
					</div>
					<Button
						color="primary"
						onPress={() => router.push("/dashboard/settings?upgrade=1")}
						startContent={<Icon icon="lucide:arrow-up-right" />}>
						Upgrade to Pro
					</Button>
				</CardBody>
			</Card>
		);
	}

	return <>{children}</>;
}

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
