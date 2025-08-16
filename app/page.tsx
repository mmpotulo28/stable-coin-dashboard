"use client";
import { Card, CardBody, CardHeader, Chip, Button, Link, Avatar, form } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { LandingFooter } from "@/components/landing-footer";
import { LandingHeader } from "@/components/landing-header";
import { color } from "framer-motion";
import { type } from "os";
import { jsx } from "react/jsx-runtime";
import style from "styled-jsx/style";

const features = [
	{
		icon: "lucide:users",
		title: "User Management",
		desc: "Create, update, delete, and view users. Search by user ID.",
		color: "primary",
	},
	{
		icon: "lucide:wallet",
		title: "Business Accounts",
		desc: "View token balances, mint stablecoins, enable gas, and see pending transactions.",
		color: "success",
	},
	{
		icon: "lucide:banknote",
		title: "Transfers",
		desc: "Find recipients, make single or batch transfers securely.",
		color: "warning",
	},
	{
		icon: "lucide:link",
		title: "Charges",
		desc: "Create payment requests, view, update, and delete charges for users.",
		color: "secondary",
	},
	{
		icon: "lucide:key",
		title: "API Tokens",
		desc: "Create, update, revoke, and search API tokens for integrations.",
		color: "default",
	},
	{
		icon: "lucide:repeat",
		title: "Transactions",
		desc: "View all transactions, user balances, and search for specific transactions.",
		color: "primary",
	},
	{
		icon: "lucide:layout-dashboard",
		title: "Modern UI",
		desc: "Responsive sidebar navigation, theme switching, and beautiful design.",
		color: "success",
	},
	{
		icon: "lucide:shield-check",
		title: "Security",
		desc: "Industry-leading encryption, 2FA, and privacy-first architecture.",
		color: "warning",
	},
];

export default function LandingPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleLeadSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setSuccess(true);
			setEmail("");
		}, 1200);
	};

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526]">
			{/* Header component */}
			<LandingHeader />

			{/* Hero Section */}
			<section className="flex flex-col md:flex-row items-center justify-center gap-12 py-20 px-6 max-w-7xl mx-auto">
				<div className="flex-1 flex flex-col gap-8 items-start">
					<h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-success animate-gradient">
						Future of Stablecoin Management
					</h1>
					<p className="text-xl max-w-xl mb-4 font-medium ">
						Experience next-gen dashboard for users, businesses, transfers, charges,
						tokens, and transactions. Fast, secure, and scalable.
					</p>
					<div className="flex gap-4">
						<Button
							color="primary"
							size="lg"
							className="shadow-lg animate-pulse"
							onPress={() => router.push("/auth/sign-up")}
							startContent={<Icon icon="lucide:user-plus" />}>
							Start Free Trial
						</Button>
						<Button
							variant="bordered"
							size="lg"
							className="shadow-lg"
							onPress={() => router.push("/auth/sign-in")}
							startContent={<Icon icon="lucide:log-in" />}>
							Sign In
						</Button>
					</div>
					<div className="mt-8 flex gap-3">
						<Chip
							color="success"
							variant="flat"
							startContent={<Icon icon="lucide:shield-check" />}>
							256-bit SSL Encryption
						</Chip>
						<Chip
							color="primary"
							variant="flat"
							startContent={<Icon icon="lucide:check-circle-2" />}>
							2FA & Biometric Login
						</Chip>
						<Chip
							color="warning"
							variant="flat"
							startContent={<Icon icon="lucide:zap" />}>
							Lightning Fast
						</Chip>
					</div>
				</div>
				<div className="flex-1 flex items-center justify-center">
					<div className="relative">
						<img
							src="https://illustrations.popsy.co/gray/app-launch.svg"
							alt="Dashboard illustration"
							className="w-full max-w-md rounded-2xl shadow-2xl border-4 border-primary/30 bg-white backdrop-blur-lg"
						/>
						<div className="absolute top-0 left-0 w-full h-full rounded-2xl pointer-events-none animate-glow" />
					</div>
				</div>
			</section>

			{/* Features Grid */}
			<section className="py-16 px-6 max-w-7xl mx-auto">
				<h2 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-success animate-gradient">
					Dashboard Features
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
					{features.map((f) => (
						<Card
							key={f.title}
							className="shadow-xl border border-default-200 bg-white/10 backdrop-blur-xl rounded-2xl hover:scale-105 transition-transform duration-200">
							<CardHeader className="flex items-center gap-3">
								<Icon
									icon={f.icon}
									className={`text-3xl text-${f.color} drop-shadow-glow`}
								/>
								<span className="font-semibold text-lg text-default-200">
									{f.title}
								</span>
							</CardHeader>
							<CardBody>
								<p className="text-default-400 text-sm">{f.desc}</p>
							</CardBody>
						</Card>
					))}
				</div>
			</section>

			{/* Footer component */}
			<LandingFooter />

			{/* Animations */}
			<style jsx global>{`
				@keyframes gradient {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				}
				.animate-gradient {
					background-size: 200% 200%;
					animation: gradient 6s ease infinite;
				}
				.drop-shadow-glow {
					filter: drop-shadow(0 0 8px #00eaff88);
				}
				.animate-spin-slow {
					animation: spin 8s linear infinite;
				}
				@keyframes spin {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(360deg);
					}
				}
				.animate-glow {
					box-shadow:
						0 0 60px 10px #00eaff44,
						0 0 120px 20px #006fee22;
					animation: glow 2s alternate infinite;
				}
				@keyframes glow {
					0% {
						box-shadow:
							0 0 60px 10px #00eaff44,
							0 0 120px 20px #006fee22;
					}
					100% {
						box-shadow:
							0 0 80px 20px #00eaff88,
							0 0 160px 40px #006fee44;
					}
				}
			`}</style>
		</div>
	);
}
