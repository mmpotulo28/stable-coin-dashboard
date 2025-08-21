"use client";
import type { ThemeProviderProps } from "next-themes";
import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ToastProvider } from "@heroui/react";
import { SideBarProvider } from "@/context/SideBarProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { AgentOptions } from "@newrelic/browser-agent/loaders/agent";
import OnboardingCheck from "@/context/OnBoardingCheck";
import OrgProPlanProvider from "@/context/OrgRequiredProvider";

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

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
	interface RouterConfig {
		routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
	}
}

export function Providers({ children, themeProps }: ProvidersProps) {
	const router = useRouter();

	return (
		<ClerkProvider
			dynamic
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
			supportEmail="support@mpotulo.com"
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
