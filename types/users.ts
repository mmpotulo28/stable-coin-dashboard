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
