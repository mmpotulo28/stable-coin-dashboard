"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN as string;

export function useLiskBusiness() {
	const [float, setFloat] = useState<{ name: string; balance: string }[]>([]);
	const [loadingFloat, setLoadingFloat] = useState(false);
	const [floatError, setFloatError] = useState<string | null>(null);

	const [gasLoading, setGasLoading] = useState(false);
	const [gasSuccess, setGasSuccess] = useState<string | null>(null);
	const [gasError, setGasError] = useState<string | null>(null);

	const [mintForm, setMintForm] = useState({
		transactionAmount: "",
		transactionRecipient: "",
		transactionNotes: "",
	});
	const [mintLoading, setMintLoading] = useState(false);
	const [mintSuccess, setMintSuccess] = useState<string | null>(null);
	const [mintError, setMintError] = useState<string | null>(null);

	const [pendingTx, setPendingTx] = useState<any>({});
	const [pendingLoading, setPendingLoading] = useState(false);
	const [pendingError, setPendingError] = useState<string | null>(null);

	const [userGasLoading, setUserGasLoading] = useState(false);
	const [userGasSuccess, setUserGasSuccess] = useState<string | null>(null);
	const [userGasError, setUserGasError] = useState<string | null>(null);

	// Fetch float balances
	const fetchFloat = async () => {
		setLoadingFloat(true);
		setFloatError(null);
		try {
			const { data } = await axios.get<{ tokens: { name: string; balance: string }[] }>(
				`${API_BASE}/float`,
				{ headers: { Authorization: API_TOKEN } },
			);
			setFloat(data.tokens || []);
		} catch (err: any) {
			setFloatError("Failed to fetch token balances.");
		} finally {
			setLoadingFloat(false);
		}
	};

	// Enable gas
	const handleEnableGas = async () => {
		setGasLoading(true);
		setGasSuccess(null);
		setGasError(null);
		try {
			await axios.post(
				`${API_BASE}/enable-gas`,
				{},
				{ headers: { Authorization: API_TOKEN } },
			);
			setGasSuccess("Gas allocation successful.");
		} catch (err: any) {
			setGasError("Failed to enable gas.");
		} finally {
			setGasLoading(false);
		}
	};

	// Enable gas for a user
	const enableUserGas = async (userId: string) => {
		setUserGasLoading(true);
		setUserGasSuccess(null);
		setUserGasError(null);
		try {
			await axios.post(
				`${API_BASE}/activate-pay/${userId}`,
				{},
				{ headers: { Authorization: API_TOKEN } },
			);
			setUserGasSuccess("Gas payment activated successfully for user.");
		} catch (err: any) {
			setUserGasError("Failed to activate gas payment for user.");
		} finally {
			setUserGasLoading(false);
		}
	};

	// Mint stablecoins
	const handleMint = async (e: React.FormEvent) => {
		e.preventDefault();
		setMintLoading(true);
		setMintSuccess(null);
		setMintError(null);
		try {
			await axios.post(
				`${API_BASE}/mint`,
				{
					transactionAmount: Number(mintForm.transactionAmount),
					transactionRecipient: mintForm.transactionRecipient,
					transactionNotes: mintForm.transactionNotes,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: API_TOKEN,
					},
				},
			);
			setMintSuccess("Mint operation successful.");
			setMintForm({ transactionAmount: "", transactionRecipient: "", transactionNotes: "" });
			fetchFloat();
		} catch (err: any) {
			setMintError("Failed to mint tokens.");
		} finally {
			setMintLoading(false);
		}
	};

	// Fetch paginated pending transactions
	const fetchPendingTx = async (page = 1, pageSize = 10) => {
		setPendingLoading(true);
		setPendingError(null);
		try {
			const { data } = await axios.get<{
				transactions: any[];
				total: number;
				page: number;
				pageSize: number;
				totalPages: number;
			}>(`${API_BASE}/transactions/pending?page=${page}&pageSize=${pageSize}`, {
				headers: { Authorization: API_TOKEN },
			});
			setPendingTx(data);
		} catch (err: any) {
			setPendingError("Failed to fetch pending transactions.");
		} finally {
			setPendingLoading(false);
		}
	};

	useEffect(() => {
		fetchFloat();
		fetchPendingTx(1, 10);
	}, []);

	return {
		float,
		loadingFloat,
		floatError,
		fetchFloat,

		gasLoading,
		gasSuccess,
		gasError,
		handleEnableGas,
		userGasLoading,
		userGasSuccess,
		userGasError,
		enableUserGas,

		mintForm,
		setMintForm,
		mintLoading,
		mintSuccess,
		mintError,
		handleMint,

		pendingTx,
		pendingLoading,
		pendingError,
		fetchPendingTx,
	};
}
