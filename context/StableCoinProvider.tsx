"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { IUser } from "@/types/users";

// Use environment variables
const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN as string;

interface StableCoinContextType {
	users: IUser[];
	loadingUsers: boolean;
	errorUsers: string | null;
	fetchUsers: () => Promise<void>;
}

const StableCoinContext = createContext<StableCoinContextType | undefined>(undefined);

export const useStableCoin = () => {
	const context = useContext(StableCoinContext);
	if (!context) {
		throw new Error("useStableCoin must be used within StableCoinProvider");
	}
	return context;
};

function setCache(key: string, value: any) {
	Cookies.set(key, JSON.stringify({ value, ts: Date.now() }), { expires: 1 / 1440 });
}
function getCache(key: string) {
	const raw = Cookies.get(key);
	if (!raw) return null;
	try {
		const { value, ts } = JSON.parse(raw);
		if (Date.now() - ts < 60000) return value;
	} catch {
		return null;
	}
	return null;
}

export function StableCoinProvider({ children }: { children: ReactNode }) {
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
				headers: { Authorization: API_TOKEN },
			});
			setUsers(data.users || []);
			setCache(cacheKey, data.users || []);
		} catch (err: any) {
			setErrorUsers(err?.response?.data?.message || "Failed to fetch users");
		} finally {
			setLoadingUsers(false);
		}
	};

	// Optionally fetch on mount
	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<StableCoinContext.Provider
			value={{
				users,
				loadingUsers,
				errorUsers,
				fetchUsers,
			}}>
			{children}
		</StableCoinContext.Provider>
	);
}
