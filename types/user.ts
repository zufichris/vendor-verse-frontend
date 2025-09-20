export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    status: string;
    isEmailVerified: boolean;
    phone?: string;
}
