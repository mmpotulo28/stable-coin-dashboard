"use client";

import { Dashboard } from "./views/dashboard";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<Dashboard />
		</section>
	);
}
