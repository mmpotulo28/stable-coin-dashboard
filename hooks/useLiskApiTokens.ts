import { useState } from "react";
import axios from "axios";
import { IApiToken, IApiTokenCreateResponse, IApiTokenRevokeResponse } from "@/types/users";
import { useOrganization } from "@clerk/nextjs";
import { useCache } from "./useCache";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;

export function useLiskApiTokens() {
	const { organization } = useOrganization();
	const { setCache, getCache } = useCache();
	const [tokens, setTokens] = useState<IApiToken[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState<string | null>(null);
	const [createdToken, setCreatedToken] = useState<IApiTokenCreateResponse | null>(null);

	const [updateLoading, setUpdateLoading] = useState(false);
	const [updateError, setUpdateError] = useState<string | null>(null);

	const [revokeLoading, setRevokeLoading] = useState(false);
	const [revokeError, setRevokeError] = useState<string | null>(null);
	const [revokeSuccess, setRevokeSuccess] = useState<string | null>(null);

	const fetchTokens = async () => {
		setLoading(true);
		setError(null);
		const cacheKey = `api_tokens_${organization?.id}`;
		const cached = getCache(cacheKey);
		if (cached) {
			setTokens(cached);
			setLoading(false);
			return;
		}
		try {
			const { data } = await axios.get<IApiToken[]>(`${API_BASE}/tokens`, {
				headers: {
					Authorization: `Bearer ${(organization?.publicMetadata.apiToken as string) || ""}`,
				},
			});
			setTokens(data);
			setCache(cacheKey, data);
		} catch (err: any) {
			setError("Failed to fetch tokens.");
		} finally {
			setLoading(false);
		}
	};

	const createToken = async (description: string) => {
		setCreateLoading(true);
		setCreateError(null);
		setCreatedToken(null);
		try {
			const { data } = await axios.post<IApiTokenCreateResponse>(
				`${API_BASE}/tokens`,
				{ description },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${(organization?.publicMetadata.apiToken as string) || ""}`,
					},
				},
			);
			setCreatedToken(data);
			await fetchTokens();
		} catch (err: any) {
			setCreateError("Failed to create token.");
		} finally {
			setCreateLoading(false);
		}
	};

	const updateToken = async (id: string, description: string) => {
		setUpdateLoading(true);
		setUpdateError(null);
		try {
			await axios.patch<IApiToken>(
				`${API_BASE}/tokens/${id}`,
				{ description },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${(organization?.publicMetadata.apiToken as string) || ""}`,
					},
				},
			);
			await fetchTokens();
		} catch (err: any) {
			setUpdateError("Failed to update token.");
		} finally {
			setUpdateLoading(false);
		}
	};

	const revokeToken = async (id: string) => {
		setRevokeLoading(true);
		setRevokeError(null);
		setRevokeSuccess(null);
		try {
			const { data } = await axios.post<IApiTokenRevokeResponse>(
				`${API_BASE}/tokens/revoke`,
				{ id },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${(organization?.publicMetadata.apiToken as string) || ""}`,
					},
				},
			);
			setRevokeSuccess(data.message);
			await fetchTokens();
		} catch (err: any) {
			setRevokeError("Failed to revoke token.");
		} finally {
			setRevokeLoading(false);
		}
	};

	return {
		tokens,
		loading,
		error,
		fetchTokens,

		createToken,
		createLoading,
		createError,
		createdToken,

		updateToken,
		updateLoading,
		updateError,

		revokeToken,
		revokeLoading,
		revokeError,
		revokeSuccess,
	};
}
