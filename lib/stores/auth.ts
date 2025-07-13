import { create } from "zustand";
import { LoginInput } from "../validations/auth";
import { User } from "@/types/user";
import { getLoggedInUser, logout } from "../actions/auth";
interface AuthStore {
    isAuthenticated: boolean;
    user: User | null;
    isLoding: boolean;
    error?: string;
    init: () => Promise<void>;
    setUser: (user: User) => void;
    logout: () => void;
}
export const authStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoding: false,
    init: async function() {
        set({ isLoding: true });
        const res = await getLoggedInUser();
        if (!res.success) {
            set({
                isAuthenticated: false,
                user: null,
                isLoding: false,
                error: res.message,
            });
        }
        set({ isAuthenticated: true, user: res.data, isLoding: false });
    },
    setUser: function(user: User) {
        set({ user, isAuthenticated: true });
    },
    logout: async function() {
        await logout();
        set({ user: null, isAuthenticated: false });
    },
}));
