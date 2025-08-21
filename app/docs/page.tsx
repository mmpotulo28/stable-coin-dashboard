"use client";
import { LandingFooter } from "@/components/landing-footer";
import { LandingHeader } from "@/components/landing-header";
import { Card, CardHeader, CardBody, Chip, Divider, Image, Snippet } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function DocsPage() {
	return (
		<>
			<LandingHeader />
			<div className="max-w-7xl w-full mx-auto py-10">
				<Card className="shadow-lg bg-default-100   mx-10 px-5">
					<CardHeader className="flex flex-col items-center gap-2 pb-2">
						<Image
							src="https://illustrations.popsy.co/gray/rocket.svg"
							alt="Docs illustration"
							width={80}
							height={80}
							className="mb-2"
						/>
						<h1 className="text-3xl font-bold text-primary mb-1 flex items-center gap-2">
							<Icon icon="lucide:book-open" className="text-3xl" />
							Stable Coin Dashboard Docs
						</h1>
						<p className="text-default-600 text-center max-w-xl">
							Welcome! This dashboard lets you manage users, business accounts,
							transfers, charges, API tokens, and transactions with a modern,
							intuitive interface.
						</p>
					</CardHeader>
					<CardBody className="space-y-10">
						<section>
							<h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
								<Icon icon="lucide:star" className="text-primary" />
								Features Overview
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="flex gap-2 items-start">
									<Chip color="primary" variant="flat">
										User Management
									</Chip>
									<span>
										Create, update, delete, and view users. Search by user ID.
									</span>
								</div>
								<div className="flex gap-2 items-start">
									<Chip color="secondary" variant="flat">
										Business Management
									</Chip>
									<span>
										View token balances, mint stablecoins, enable gas, and see
										pending transactions.
									</span>
								</div>
								<div className="flex gap-2 items-start">
									<Chip color="success" variant="flat">
										Transfers
									</Chip>
									<span>Find recipients, make single or batch transfers.</span>
								</div>
								<div className="flex gap-2 items-start">
									<Chip color="warning" variant="flat">
										Charges
									</Chip>
									<span>
										Create payment requests, view, update, and delete charges
										for users.
									</span>
								</div>
								<div className="flex gap-2 items-start">
									<Chip color="default" variant="flat">
										API Tokens
									</Chip>
									<span>
										Create, update, revoke, and search API tokens for
										integrations.
									</span>
								</div>
								<div className="flex gap-2 items-start">
									<Chip color="secondary" variant="flat">
										Transactions
									</Chip>
									<span>
										View all transactions, user balances, and search for
										specific transactions.
									</span>
								</div>
							</div>
						</section>
						<Divider />
						<section>
							<h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
								<Icon icon="lucide:compass" className="text-primary" />
								How to Use
							</h2>
							<ul className="space-y-3 text-default-700">
								<li>
									<b>Sidebar Navigation:</b> Use the sidebar to access Dashboard,
									Users, Business, Transfers, Charges, API Tokens, Transactions,
									and Settings.
								</li>
								<li>
									<b>User Management:</b> View all users, create new users, update
									or delete existing users, and search for a user by ID.
								</li>
								<li>
									<b>Business Management:</b> View token balances, mint
									stablecoins, enable gas for business or users, and monitor
									pending transactions.
								</li>
								<li>
									<b>Transfers:</b> Find recipients, make single transfers, or
									execute batch payments.
								</li>
								<li>
									<b>Charges:</b> Create payment requests, view all charges,
									update charge details, or delete charges.
								</li>
								<li>
									<b>API Tokens:</b> Manage API tokens for integrations. Copy and
									store tokens securely.
								</li>
								<li>
									<b>Transactions:</b> View all transactions, search by user, or
									look up specific transaction details.
								</li>
							</ul>
						</section>
						<Divider />
						<section>
							<h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
								<Icon icon="lucide:lightbulb" className="text-primary" />
								Tips & Best Practices
							</h2>
							<ul className="space-y-2 text-default-700">
								<li>
									<Icon
										icon="lucide:search"
										className="inline text-primary mr-1"
									/>
									Use search and filter features in each section to quickly find
									users, charges, or transactions.
								</li>
								<li>
									<Icon icon="lucide:key" className="inline text-primary mr-1" />
									Copy and store API tokens securely when created; they are only
									shown once.
								</li>
								<li>
									<Icon icon="lucide:moon" className="inline text-primary mr-1" />
									Use the theme switcher in the header to toggle between light and
									dark modes.
								</li>
								<li>
									<Icon
										icon="lucide:help-circle"
										className="inline text-primary mr-1"
									/>
									Refer to inline help and tooltips for guidance on specific
									actions.
								</li>
							</ul>
						</section>
						<Divider />
						<section>
							<h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
								<Icon icon="lucide:settings" className="text-primary" />
								Customization & Support
							</h2>
							<p className="mb-2 text-default-700">
								For more details, see the <b>README.md</b> file or the inline code
								comments. You can customize navigation, add new features, or change
								the site configuration as needed.
							</p>
							<Snippet
								hideSymbol
								variant="bordered"
								size="sm"
								className="max-w-full overflow-auto w-full"
								copyButtonProps={{ "aria-label": "Copy GitHub URL" }}>
								https://github.com/mmpotulo28/stable-coin-dashboard
							</Snippet>
						</section>
						<Divider />
						<section>
							<h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
								<Icon icon="lucide:shield-check" className="text-primary" />
								License
							</h2>
							<p className="mb-2 text-default-700">
								This application is licensed under the MIT license.
							</p>
						</section>
					</CardBody>
				</Card>
			</div>
			<LandingFooter />
		</>
	);
}
