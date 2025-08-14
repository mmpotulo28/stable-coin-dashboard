"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type SideBarContextType = {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
};

const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

export const useSideBar = () => {
	const context = useContext(SideBarContext);
	if (!context) {
		throw new Error("useSideBar must be used within a SideBarProvider");
	}
	return context;
};

type SideBarProviderProps = {
	children: ReactNode;
};

export const SideBarProvider = ({ children }: SideBarProviderProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	return (
		<SideBarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
			{children}
		</SideBarContext.Provider>
	);
};
