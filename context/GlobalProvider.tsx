import { useOrganization } from "@clerk/nextjs";
import { useLiskUsers } from "@mmpotulo/stablecoin-hooks";
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
	const { organization } = useOrganization();
	const apiKey = organization?.publicMetadata.apiToken as string;
	const { fetchUsers, users } = useLiskUsers({ apiKey: apiKey });

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
