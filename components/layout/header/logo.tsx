import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Logo() {
    return (
        <div className="flex-shrink-0">
            <Link href="/home">
                <h1 className="tracking-tight uppercase">
                    <Image
                        src={'/Aetli logo_Cream.svg'}
                        alt="Logo"
                        width={150}
                        height={150}
                    />
                </h1>
            </Link>
        </div>
    );
}
