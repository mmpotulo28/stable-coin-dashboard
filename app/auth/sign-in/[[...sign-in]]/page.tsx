"use client";
import { useState, useEffect } from "react";
import { Alert, Card } from "@heroui/react";
import { ShieldCheck, Lock, CheckCircle2, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { SignIn, useUser } from "@clerk/nextjs";
import { LandingHeader } from "@/components/landing-header";
import { LandingFooter } from "@/components/landing-footer";

export default function SignInPage() {
	const [message, setMessage] = useState<string | null>(null);
	const router = useRouter();
	const { user } = useUser();

	useEffect(() => {
		if (user) {
			router.replace("/account");
		}
	}, [user, router]);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const messageParam = params.get("message");
		if (messageParam === "account-created") {
			setMessage("Account created successfully! Please sign in to continue.");
		} else if (messageParam === "email-verified") {
			setMessage("Email verified successfully! Please sign in to continue.");
		}
	}, []);

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] relative overflow-hidden">
			{/* Animated gradient background */}
			<div className="absolute inset-0 z-0 pointer-events-none animate-gradient-glow" />
			<LandingHeader />
			<div className="min-h-[80vh] flex items-center justify-center py-16 relative z-10">
				<Card className="w-full max-w-4xl flex flex-col md:flex-row shadow-2xl border border-primary/30 bg-white/10 backdrop-blur-2xl overflow-hidden rounded-3xl glass-card-glow">
					{/* Left: Illustration & Security Info */}
					<div className="hidden md:flex flex-col justify-between items-center bg-gradient-to-br from-primary-100 to-primary-50 p-10 w-1/2 min-h-[500px] relative">
						<div className="absolute inset-0 pointer-events-none animate-glow rounded-2xl" />
						<div className="flex flex-col items-center gap-6">
							<img
								src="https://illustrations.popsy.co/gray/app-launch.svg"
								alt="Dashboard illustration"
								className="w-32 mb-4 rounded-xl shadow-lg border-2 border-primary/30 bg-white/10 backdrop-blur-lg "
							/>
							<h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-success animate-gradient text-center drop-shadow-glow">
								Welcome Back
							</h2>
							<p className="text-default-200 text-center max-w-xs font-medium drop-shadow-glow">
								Sign in to access your dashboard. Your data is protected with
								industry-leading security.
							</p>
						</div>
						<div className="flex flex-col gap-3 mt-8 w-full">
							<div className="flex items-center gap-2">
								<Lock className="text-success drop-shadow-glow" size={20} />
								<span className="text-sm text-default-700">
									256-bit SSL Encryption
								</span>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle2 className="text-success drop-shadow-glow" size={20} />
								<span className="text-sm text-default-700">
									2FA & biometric login supported
								</span>
							</div>
							<div className="flex items-center gap-2">
								<KeyRound className="text-success drop-shadow-glow" size={20} />
								<span className="text-sm text-default-700">
									Private keys never leave your device
								</span>
							</div>
						</div>
						<div className="flex flex-col items-center mt-8">
							<span className="text-xs text-default-400 mt-2">
								Trusted by thousands of users
							</span>
						</div>
					</div>
					{/* Right: Sign In Form */}
					<div className="flex-1 flex flex-col justify-center p-0 bg-background relative">
						<div className="clerk-signin-wrapper flex flex-col items-center justify-center">
							<SignIn
								appearance={{
									elements: {
										formButtonPrimary:
											"bg-gradient-to-r from-primary to-success text-white rounded-xl py-2 px-4 font-bold shadow-lg hover:scale-105 transition-transform duration-200 border-2 border-primary/40",
										card: "bg-white/10 backdrop-blur-2xl border border-primary/30 shadow-2xl rounded-2xl p-8 glass-card-glow",
										headerTitle:
											"text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-success animate-gradient mb-4 text-center drop-shadow-glow",
										headerSubtitle: "text-default-400 mb-4 text-center",
										formFieldInput:
											"bg-background/80 border border-default-200 rounded-lg px-3 py-2 text-default-800 focus:border-primary focus:ring-2 focus:ring-primary/30 shadow-md",
										formFieldLabel: "text-default-700 font-semibold mb-2",
										formFieldError: "text-danger text-sm mt-1",
										footerActionText: "text-default-500",
										footerActionLink: "text-primary underline font-semibold",
										identityPreview: "bg-default-100 rounded-md px-2 py-1",
									},
								}}
							/>
						</div>
					</div>
				</Card>
			</div>
			<LandingFooter />
			<style jsx global>{`
				.clerk-signin-wrapper .cl-internal-b3fm6y {
					background: transparent !important;
					box-shadow: none !important;
				}
				.clerk-signin-wrapper .cl-internal-1fsg6zy {
					background: transparent !important;
				}
				.clerk-signin-wrapper .cl-internal-1fsg6zy input {
					background: #f8fafc22 !important;
					color: #232526 !important;
				}
				.clerk-signin-wrapper .cl-internal-1fsg6zy label {
					color: #2c5364 !important;
				}
				.clerk-signin-wrapper .cl-internal-1fsg6zy .cl-internal-1fsg6zy {
					border-radius: 0.75rem !important;
				}
				.glass-card-glow {
					box-shadow:
						0 0 60px 10px #00eaff44,
						0 0 120px 20px #006fee22;
					border: 2px solid #00eaff44;
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
				@keyframes gradient-glow {
					0% {
						background: linear-gradient(115deg, #0f2027 0%, #2c5364 50%, #232526 100%);
						opacity: 0.7;
					}
					50% {
						background: linear-gradient(115deg, #232526 0%, #2c5364 50%, #0f2027 100%);
						opacity: 1;
					}
					100% {
						background: linear-gradient(115deg, #0f2027 0%, #2c5364 50%, #232526 100%);
						opacity: 0.7;
					}
				}
				.animate-gradient-glow {
					animation: gradient-glow 8s ease-in-out infinite;
					background-size: 200% 200%;
					position: absolute;
					inset: 0;
					z-index: 0;
					filter: blur(40px);
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
			`}</style>
		</div>
	);
}
