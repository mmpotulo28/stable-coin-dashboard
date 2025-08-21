"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { IUser } from "@/types/users";
import { useOrganization } from "@clerk/nextjs";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useCache } from "./useCache";

// Use environment variables
const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;

interface useLiskUsersType {
	users: IUser[];
	loadingUsers: boolean;
	errorUsers: string | null;
	fetchUsers: () => Promise<void>;
}

export const useLiskUsers = (): useLiskUsersType => {
	const { organization } = useOrganization();
	const { setCache, getCache } = useCache();
	const [users, setUsers] = useState<IUser[]>([]);
	const [loadingUsers, setLoadingUsers] = useState(false);
	const [errorUsers, setErrorUsers] = useState<string | null>(null);

	const fetchUsers = async () => {
		setLoadingUsers(true);
		setErrorUsers(null);
		const cacheKey = "users_list";
		const cached = getCache(cacheKey);
		if (cached) {
			setUsers(cached);
			setLoadingUsers(false);
			return;
		}
		try {
			const { data } = await axios.get<{ users: IUser[] }>(`${API_BASE}/users`, {
				headers: {
					Authorization: `Bearer ${(organization?.publicMetadata.apiToken as string) || ""}`,
				},
			});
			setUsers(data.users || []);
			setCache(cacheKey, data.users || []);
		} catch (err: any) {
			setErrorUsers(err?.response?.data?.message || "Failed to fetch users");
		} finally {
			setLoadingUsers(false);
		}
	};

	return {
		users,
		loadingUsers,
		errorUsers,
		fetchUsers,
	};
};
