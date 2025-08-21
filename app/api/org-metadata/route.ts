import { NextRequest, NextResponse } from "next/server";
import { createClerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
	const clerkClient = createClerkClient({
		publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
		secretKey: process.env.CLERK_SECRET_KEY,
	});
	const body = await req.json();
	const { orgId, apiToken, businessName, businessDesc, onboarded } = body;

	if (!orgId) {
		return NextResponse.json({ error: "Missing orgId" }, { status: 400 });
	}

	try {
		console.log("Updating org metadata: for ", orgId);
		const res = await clerkClient.organizations.updateOrganizationMetadata(orgId, {
			publicMetadata: {
				apiToken,
				businessName,
				businessDesc,
				onboarded,
			},
		});

		console.log("Updated org metadata:", res);
		return NextResponse.json({ success: true });
	} catch (err: any) {
		console.error("Failed to update org metadata:", err.errors, err);
		return NextResponse.json({ error: "Failed to update org metadata" }, { status: 500 });
	}
}
