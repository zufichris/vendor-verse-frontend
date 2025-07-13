"use client";
import { authStore } from "@/lib/stores/auth";
import React, { useCallback, useEffect } from "react";
export function AuthContext({
    children,
}: {
    children?: React.ReactNode;
}): React.ReactNode {
    const init = authStore((state) => state.init);
    const s = useCallback(() => {
        init();
    }, [init]);
    useEffect(() => {
        s();
    }, [s]);
    return <React.Fragment>{children}</React.Fragment>;
}
