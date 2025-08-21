import { useLiskUsers } from "@/hooks/useLiskUsers";
import { useContext, createContext, useState, useEffect } from "react";

export interface GlobalContextType {
	selectedUser: any;
	setSelectedUser: (user: any) => void;
	globalUsers: any[];
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function useGlobalContext() {
	const ctx = useContext(GlobalContext);
	if (!ctx) {
		throw new Error("useGlobalContext must be used within a GlobalProvider");
	}
	return ctx;
}

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
	const { users, fetchUsers } = useLiskUsers();
	const [selectedUser, setSelectedUser] = useState<any>(null);

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<GlobalContext.Provider value={{ selectedUser, setSelectedUser, globalUsers: users }}>
			{children}
		</GlobalContext.Provider>
	);
}
