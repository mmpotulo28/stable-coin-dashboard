import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useOrganization } from "@clerk/nextjs";

// --- Onboarding Modal ---
function OnboardingModal({ onComplete }: { onComplete: () => void }) {
	const [apiToken, setApiToken] = useState("");
	const [businessName, setBusinessName] = useState("");
	const [businessDesc, setBusinessDesc] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [skipped, setSkipped] = useState(false);
	const { organization: org } = useOrganization();

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
			if (!org) {
				throw new Error("Organization not found");
			}
			await axios.post("/api/org-metadata", {
				orgId: org?.id,
				apiToken: `<Bearer ${apiToken}>`,
				businessName: org?.name,
				businessDesc,
				onboarded: true,
			});
			onComplete();
		} catch (err: any) {
			console.error("Failed to save onboarding info:", err);
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
		<div className="bg-background rounded-2xl shadow-2xl p-8 w-full max-w-md border border-primary/30">
			<h2 className="text-2xl font-bold mb-4 text-primary text-center">
				Welcome! Onboard Your Business
			</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<Input
					radius="sm"
					startContent={<Icon icon="lucide:key" />}
					variant="bordered"
					color="primary"
					type="password"
					label="API Token"
					placeholder="78c768d86s8 ..."
					value={apiToken}
					onChange={(e) => setApiToken(e.target.value)}
					required
					security="bearer"
				/>
				<Input
					radius="sm"
					startContent={<Icon icon="lucide:briefcase-business" />}
					variant="faded"
					color="secondary"
					type="text"
					label="Business Name"
					placeholder="Business Name"
					value={org?.name ?? businessName}
					onChange={(e) => setBusinessName(e.target.value)}
					required
					disabled={!!org?.name}
					readOnly={!!org?.name}
				/>
				<Input
					radius="sm"
					startContent={<Icon icon="lucide:info" />}
					variant="bordered"
					color="primary"
					type="text"
					label="Business Description"
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
	);
}

export default OnboardingModal;
