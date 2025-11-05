import { User } from "./user";

export interface AuthData {
    accessToken: string;
    expiresIn: number;
    user?: User;
}