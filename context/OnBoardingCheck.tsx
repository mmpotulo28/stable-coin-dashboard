import OnboardingModal from "@/components/onboarding-modal";
import { useUser, useOrganization } from "@clerk/nextjs";
import { CreateOrganization } from "@clerk/nextjs";
import { Modal, ModalContent } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function OnboardingCheck({ children }: { children: React.ReactNode }) {
	const { isLoaded: userLoaded, user } = useUser();
	const { organization, isLoaded: orgLoaded } = useOrganization();
	const [showModal, setShowModal] = useState(false);
	const [showCreateOrg, setShowCreateOrg] = useState(true);
	const path = usePathname();

	useEffect(() => {
		if (!userLoaded) return;

		// get users organizations
		const fetchOrganizations = async () => {
			if (!user) return;
			console.log("fetching orgs for ", user.id);
			const orgs = user?.organizationMemberships;
			console.log("fetched orgs: ", orgs);

			if (!orgs || orgs.length === 0) {
				console.log("no orgs found");
				setShowCreateOrg(true);
				setShowModal(false);
				return;
			}

			setShowCreateOrg(false);
		};

		fetchOrganizations();
	}, [userLoaded, user, path]);

	// Check if the user has completed onboarding
	useEffect(() => {
		if (!userLoaded || !orgLoaded || !organization || showCreateOrg) return;
		const skipUntil = localStorage.getItem("onboarding_skip_until");
		const skipActive = skipUntil && Date.now() < Number(skipUntil);

		const meta = organization?.publicMetadata || {};
		const needsOnboarding =
			!meta.onboarded || !meta.apiToken || !meta.businessName || !meta.businessDesc;

		setTimeout(() => {
			setShowModal(!skipActive && needsOnboarding);
		}, 1000);
	}, [organization, userLoaded, orgLoaded, showCreateOrg]);

	if (showCreateOrg) {
		return (
			<>
				{children}
				<Modal
					isOpen={showCreateOrg}
					onClose={() => setShowCreateOrg(false)}
					hideCloseButton
					className="max-w-lg mx-auto rounded-2xl shadow-2xl bg-default-50 w-fit">
					<ModalContent>
						<CreateOrganization path={path} afterCreateOrganizationUrl={path} />
					</ModalContent>
				</Modal>
			</>
		);
	}

	return (
		<>
			{children}
			<Modal
				isOpen={showModal && !!organization}
				onClose={() => {}}
				hideCloseButton
				className="max-w-lg mx-auto rounded-2xl shadow-2xl bg-default-50 w-fit">
				<ModalContent>
					<OnboardingModal onComplete={() => setShowModal(false)} />
				</ModalContent>
			</Modal>
		</>
	);
}

export default OnboardingCheck;
