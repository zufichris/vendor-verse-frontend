import Link from "next/link";
import React from "react";

export function Logo() {
    return (
        <div className="flex-shrink-0">
            <Link href="/home">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    LUXE
                </h1>
            </Link>
        </div>
    );
}
