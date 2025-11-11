'use client'
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Logo() {
    const isMob = useIsMobile()
    return (
        <div className="flex-shrink-0">
            <Link href="/home">
                <h1 className="tracking-tight uppercase">
                    <Image
                        src={'/Aetli logo_Cream.svg'}
                        alt="Logo"
                        width={isMob ? 100 : 150}
                        height={isMob ? 100 : 150}
                    />
                </h1>
            </Link>
        </div>
    );
}
