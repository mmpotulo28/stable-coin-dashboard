"use client";
import React, { useState } from "react";
import { Tabs, Tab, Input, Button, Spinner, Image, Card, Divider } from "@heroui/react";
import { UserList } from "@/components/user-list";
import { UserDetailsCard } from "@/components/user-details-card";
import axios from "axios";
import { IUser } from "@/types/users";
import { Icon } from "@iconify/react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN as string;

const UsersPage = () => {
	const [selectedTab, setSelectedTab] = useState<"all" | "single">("all");
	const [searchId, setSearchId] = useState("");
	const [searching, setSearching] = useState(false);
	const [searchError, setSearchError] = useState<string | null>(null);
	const [foundUser, setFoundUser] = useState<IUser | null>(null);

	const handleSearch = async () => {
		if (!searchId.trim()) return;
		setSearching(true);
		setSearchError(null);
		setFoundUser(null);
		try {
			const { data } = await axios.get<{ user: IUser }>(
				`${API_BASE}/users/${searchId.trim()}`,
				{
					headers: { Authorization: API_TOKEN },
				},
			);

			console.log("user found", data);
			setFoundUser(data.user);
		} catch (err: any) {
			if (err?.response?.status === 404) {
				setSearchError("User not found.");
			} else if (err?.response?.status === 400) {
				setSearchError("Invalid user ID.");
			} else if (err?.response?.status === 401) {
				setSearchError("Unauthorized.");
			} else {
				setSearchError("Failed to fetch user.");
			}
		} finally {
			setSearching(false);
		}
	};

	const handleClear = () => {
		setSearchId("");
		setFoundUser(null);
		setSearchError(null);
	};

	return (
		<div className="flex-1 overflow-auto p-6 relative">
			<h1 className="text-2xl font-semibold mb-6">User Management</h1>
			<Tabs
				selectedKey={selectedTab}
				onSelectionChange={(key) => setSelectedTab(key as "all" | "single")}
				className="mb-8">
				<Tab key="all" title="All Users">
					<UserList />
				</Tab>
				<Tab key="single" title="Single User">
					<div className="max-w-full mx-0">
						{/* Step 1: Search Form Card */}
						{!foundUser && (
							<Card className="p-8 mb-6 flex flex-col items-center max-w-lg mx-auto">
								<Image
									src="https://illustrations.popsy.co/gray/woman-on-laptop-google.svg"
									alt="Search illustration"
									width={120}
									height={120}
									className="mb-4"
								/>
								<h2 className="text-lg font-semibold mb-2">Find a User by ID</h2>
								<p className="text-default-500 mb-6 text-center">
									Enter the unique user ID below to search for a specific user.
								</p>
								<form
									onSubmit={(e) => {
										e.preventDefault();
										handleSearch();
									}}
									className="w-full flex flex-col gap-4">
									<div className="flex gap-2 items-center">
										<Input
											placeholder="Enter user ID..."
											startContent={<Icon icon="lucide:search" />}
											value={searchId}
											onChange={(e) => setSearchId(e.target.value)}
											className="flex-1"
											isDisabled={searching}
										/>
										<Button
											color="primary"
											type="submit"
											isDisabled={!searchId.trim() || searching}>
											{searching ? (
												<Spinner size="sm" />
											) : (
												<Icon icon="lucide:search" />
											)}
										</Button>
										{searchId && (
											<Button
												variant="light"
												onPress={handleClear}
												className="ml-2"
												type="button"
												isDisabled={searching}>
												Clear
											</Button>
										)}
									</div>
									{searching && (
										<div className="flex flex-col items-center gap-2 mt-4">
											<Spinner label="Searching for user..." />
											<p className="text-default-400 text-sm">
												Please wait while we look up the user.
											</p>
										</div>
									)}
									{searchError && (
										<div className="flex flex-col items-center gap-2 mt-4">
											<Image
												src="https://illustrations.popsy.co/gray/error.svg"
												alt="Error illustration"
												width={80}
												height={80}
											/>
											<div className="text-danger font-medium">
												{searchError}
											</div>
										</div>
									)}
								</form>
							</Card>
						)}
						{/* Step 2: Show user details */}
						{foundUser && (
							<div>
								<Button
									radius="sm"
									variant="bordered"
									color="primary"
									className="absolute  top-8 right-5"
									onPress={handleClear}
									startContent={<Icon icon="lucide:search" />}>
									Search Again
								</Button>
								<Divider className="my-4" />
								<UserDetailsCard user={foundUser} />
							</div>
						)}
					</div>
				</Tab>
			</Tabs>
		</div>
	);
};

export default UsersPage;
