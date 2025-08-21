import { useOrganization } from "@clerk/nextjs";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const OrgPlanContext = createContext(false);

// Upgrade prompt component
function OrgProPlanProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { organization } = useOrganization();
	const [isPro, setIsPro] = useState(true);

	useEffect(() => {
		async function checkProPlan() {
			const subscriptions = await organization?.getSubscriptions();
			const IsPro =
				subscriptions?.data.some(
					(sub) => sub.status === "active" && sub.plan?.slug === "pro_plan",
				) || false;
			setIsPro(IsPro);

			console.log("Is Pro Plan:", IsPro, subscriptions);
		}
		checkProPlan();
	}, [organization]);

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

export function useOrgPlan() {
	return useContext(OrgPlanContext);
}

export default OrgProPlanProvider;
