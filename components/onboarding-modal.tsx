import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";

// --- Onboarding Modal ---
function OnboardingModal({ user, onComplete }: { user: any; onComplete: () => void }) {
	const [apiToken, setApiToken] = useState("");
	const [businessName, setBusinessName] = useState("");
	const [businessDesc, setBusinessDesc] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [skipped, setSkipped] = useState(false);

	// Check skip flag in localStorage
	useEffect(() => {
		const skipUntil = localStorage.getItem("onboarding_skip_until");
		if (skipUntil && Date.now() < Number(skipUntil)) setSkipped(true);
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			await user.update({
				unsafeMetadata: {
					apiToken,
					businessName,
					businessDesc,
					onboarded: true,
				},
			});
			onComplete();
		} catch (err: any) {
			setError("Failed to save onboarding info.");
		} finally {
			setLoading(false);
		}
	};

	const handleSkip = () => {
		const skipUntil = Date.now() + 5 * 60 * 1000; // 5 min
		localStorage.setItem("onboarding_skip_until", String(skipUntil));
		setSkipped(true);
		onComplete();
	};

	if (skipped) return null;

	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
			<div className="bg-background backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md border border-primary/30">
				<h2 className="text-2xl font-bold mb-4 text-primary text-center">
					Welcome! Onboard Your Business
				</h2>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<Input
						radius="sm"
						startContent={<Icon icon="lucide:key" />}
						variant="bordered"
						type="password"
						placeholder="API Token"
						value={apiToken}
						onChange={(e) => setApiToken(e.target.value)}
						required
					/>
					<Input
						radius="sm"
						startContent={<Icon icon="lucide:briefcase-business" />}
						variant="bordered"
						type="text"
						placeholder="Business Name"
						value={businessName}
						onChange={(e) => setBusinessName(e.target.value)}
						required
					/>
					<Input
						radius="sm"
						startContent={<Icon icon="lucide:info" />}
						variant="bordered"
						type="text"
						placeholder="Business Description"
						value={businessDesc}
						onChange={(e) => setBusinessDesc(e.target.value)}
						required
					/>
					{error && <div className="text-danger text-sm">{error}</div>}
					<Button color="primary" type="submit" disabled={loading}>
						{loading ? "Saving..." : "Complete Onboarding"}
					</Button>
					<Button
						variant="light"
						type="button"
						onPress={handleSkip}
						className="text-xs text-default-500 mt-2 underline hover:text-primary">
						Skip for 5 minutes
					</Button>
				</form>
			</div>
		</div>
	);
}

export default OnboardingModal;
