import { useState } from "react";
import axios from "axios";
import { useOrganization } from "@clerk/nextjs";
import {
	ICoupon,
	ICouponCreateRequest,
	ICouponUpdateRequest,
	ICouponClaimRequest,
	ICouponResponse,
} from "@/types/users";
import { useCache } from "./useCache";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;

export function useCoupons() {
	const { organization } = useOrganization();
	const { setCache, getCache } = useCache();
	const [coupons, setCoupons] = useState<ICoupon[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Get all coupons
	const fetchCoupons = async () => {
		setLoading(true);
		setError(null);
		const cacheKey = `coupons_${organization?.id}`;
		const cached = getCache(cacheKey);
		if (cached) {
			setCoupons(cached);
			setLoading(false);
			return;
		}
		try {
			const { data } = await axios.get<ICoupon[]>(`${API_BASE}/coupons`, {
				headers: {
					Authorization: `Bearer ${(organization?.publicMetadata.apiToken as string) || ""}`,
				},
			});
			setCoupons(data);
			setCache(cacheKey, data);
		} catch (err: any) {
			setError("Failed to fetch coupons.");
		} finally {
			setLoading(false);
		}
	};

	// Create a new coupon for a user
	const createCoupon = async (userId: string, coupon: ICouponCreateRequest) => {
		setLoading(true);
		setError(null);
		try {
			const { data } = await axios.post<ICouponResponse>(
				`${API_BASE}/coupons/${encodeURIComponent(userId)}`,
				coupon,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${(organization?.publicMetadata.apiToken as string) || ""}`,
					},
				},
			);
			await fetchCoupons();
			return data;
		} catch (err: any) {
			setError("Failed to create coupon.");
		} finally {
			setLoading(false);
		}
	};

	// Claim a coupon for a user
	const claimCoupon = async (userId: string, couponId: string) => {
		setLoading(true);
		setError(null);
		try {
			const { data } = await axios.patch<ICouponResponse>(
				`${API_BASE}/coupons/claim/${encodeURIComponent(userId)}`,
				{ couponId },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${(organization?.publicMetadata.apiToken as string) || ""}`,
					},
				},
			);
			await fetchCoupons();
			return data;
		} catch (err: any) {
			setError("Failed to claim coupon.");
		} finally {
			setLoading(false);
		}
	};

	// Update a coupon for a user
	const updateCoupon = async (userId: string, couponId: string, coupon: ICouponUpdateRequest) => {
		setLoading(true);
		setError(null);
		try {
			const { data } = await axios.put<ICouponResponse>(
				`${API_BASE}/coupons/${encodeURIComponent(userId)}/${encodeURIComponent(couponId)}`,
				coupon,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${(organization?.publicMetadata.apiToken as string) || ""}`,
					},
				},
			);
			await fetchCoupons();
			return data;
		} catch (err: any) {
			setError("Failed to update coupon.");
		} finally {
			setLoading(false);
		}
	};

	// Delete a coupon for a user
	const deleteCoupon = async (userId: string, couponId: string) => {
		setLoading(true);
		setError(null);
		try {
			await axios.delete(
				`${API_BASE}/coupons/${encodeURIComponent(userId)}/${encodeURIComponent(couponId)}`,
				{
					headers: {
						Authorization: `Bearer ${(organization?.publicMetadata.apiToken as string) || ""}`,
					},
				},
			);
			await fetchCoupons();
		} catch (err: any) {
			setError("Failed to delete coupon.");
		} finally {
			setLoading(false);
		}
	};

	return {
		coupons,
		loading,
		error,
		fetchCoupons,
		createCoupon,
		claimCoupon,
		updateCoupon,
		deleteCoupon,
	};
}
