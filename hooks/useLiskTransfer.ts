import { useState } from "react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN as string;

export function useLiskTransfer() {
	const [recipient, setRecipient] = useState<any>(null);
	const [recipientLoading, setRecipientLoading] = useState(false);
	const [recipientError, setRecipientError] = useState<string | null>(null);

	const [transferLoading, setTransferLoading] = useState(false);
	const [transferSuccess, setTransferSuccess] = useState<string | null>(null);
	const [transferError, setTransferError] = useState<string | null>(null);

	const [batchLoading, setBatchLoading] = useState(false);
	const [batchSuccess, setBatchSuccess] = useState<string | null>(null);
	const [batchError, setBatchError] = useState<string | null>(null);

	// Fetch recipient details by payment identifier or email
	const fetchRecipient = async (id: string) => {
		setRecipientLoading(true);
		setRecipientError(null);
		setRecipient(null);
		try {
			const { data } = await axios.get(`${API_BASE}/recipient/${id}`, {
				headers: { Authorization: API_TOKEN },
			});
			setRecipient(data);
		} catch (err: any) {
			if (err?.response?.status === 404) {
				setRecipientError("Recipient not found.");
			} else if (err?.response?.status === 400) {
				setRecipientError("Invalid identifier provided.");
			} else if (err?.response?.status === 401) {
				setRecipientError("Unauthorized.");
			} else {
				setRecipientError("Failed to fetch recipient.");
			}
		} finally {
			setRecipientLoading(false);
		}
	};

	// Single transfer
	const makeTransfer = async ({
		userId,
		transactionAmount,
		transactionRecipient,
		transactionNotes,
	}: {
		userId: string;
		transactionAmount: number;
		transactionRecipient: string;
		transactionNotes?: string;
	}) => {
		setTransferLoading(true);
		setTransferSuccess(null);
		setTransferError(null);
		try {
			const { data } = await axios.post(
				`${API_BASE}/transfer/${userId}`,
				{
					transactionAmount,
					transactionRecipient,
					transactionNotes,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: API_TOKEN,
					},
				},
			);
			setTransferSuccess(data.message || "Transfer executed successfully.");
			return data;
		} catch (err: any) {
			if (err?.response?.status === 400) {
				setTransferError("Invalid input or validation error.");
			} else if (err?.response?.status === 401) {
				setTransferError("Unauthorized.");
			} else {
				setTransferError("Failed to execute transfer.");
			}
		} finally {
			setTransferLoading(false);
		}
	};

	// Batch transfer
	const makeBatchTransfer = async ({
		userId,
		payments,
		transactionNotes,
	}: {
		userId: string;
		payments: { recipient: string; amount: number }[];
		transactionNotes?: string;
	}) => {
		setBatchLoading(true);
		setBatchSuccess(null);
		setBatchError(null);
		try {
			const { data } = await axios.post(
				`${API_BASE}/transfer/batch/${userId}`,
				{
					payments,
					transactionNotes,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: API_TOKEN,
					},
				},
			);
			setBatchSuccess(data.message || "Batch transfer executed successfully.");
			return data;
		} catch (err: any) {
			if (err?.response?.status === 400) {
				setBatchError("Invalid input or validation error.");
			} else if (err?.response?.status === 401) {
				setBatchError("Unauthorized.");
			} else {
				setBatchError("Failed to execute batch transfer.");
			}
		} finally {
			setBatchLoading(false);
		}
	};

	return {
		recipient,
		recipientLoading,
		recipientError,
		fetchRecipient,

		transferLoading,
		transferSuccess,
		transferError,
		makeTransfer,

		batchLoading,
		batchSuccess,
		batchError,
		makeBatchTransfer,
	};
}
