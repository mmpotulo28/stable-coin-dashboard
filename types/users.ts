export interface IUser {
	id: string;
	firstName: string | null;
	lastName: string | null;
	email: string;
	imageUrl: string | null;
	enabledPay: boolean | null;
	role: string;
	publicKey: string | null;
	paymentIdentifier: string | null;
	businessId: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface IUserTokenBalance {
	name: string;
	balance: number;
}

export interface IUserTransaction {
	id: string;
	userId: string;
	externalId?: string | null;
	txType: string;
	method: string;
	currency: string;
	value: number;
	status: string;
	createdAt: string;
}

export interface IApiToken {
	id: string;
	description: string | null;
	revoked: boolean;
	createdAt: string;
	revokedAt: string | null;
}

export interface IApiTokenCreateResponse {
	id: string;
	token: string;
}

export interface IApiTokenRevokeResponse {
	message: string;
}

export interface ICharge {
	id: string;
	paymentId: string;
	amount: number;
	note?: string | null;
	status: "PENDING" | "COMPLETE";
	userId: string;
	createdAt: string;
	updatedAt: string;
}

export interface iBankAccount {
	id: string;
	userId: string;
	accountHolder: string;
	accountNumber: string;
	branchCode: string;
	bank: string;
	createdAt: string;
	updatedAt: string;
}

export interface iDepositWithdrawalTransaction {
	id: string;
	userId: string;
	transactionType: string;
	transactionMethod: string;
	transactionCurrency: string;
	transactionAmount: number;
	transactionNetwork?: string;
	transactionAddress?: string;
	createdAt: string;
	updatedAt: string;
}

export interface iBankAccountResponse {
	message?: string;
	bankAccount?: iBankAccount;
}

export interface ICoupon {
	id: string;
	userId: string;
	title: string;
	imageUrl: string | null;
	description: string;
	code: string;
	ref: string;
	validUntil: string;
	maxCoupons: number;
	availableCoupons: number;
	createdAt: string;
	updatedAt: string;
}

export interface ICouponCreateRequest {
	title: string;
	imageUrl: string | null;
	description: string;
	code: string;
	ref: string;
	validUntil: string;
	maxCoupons: number;
	availableCoupons: number;
}

export interface ICouponUpdateRequest extends ICouponCreateRequest {}

export interface ICouponClaimRequest {
	couponId: string;
}

export interface ICouponResponse {
	message?: string;
	coupon?: ICoupon;
}
