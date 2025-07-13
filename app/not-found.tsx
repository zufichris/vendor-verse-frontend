"use client";

import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
                    <h2 className="text-2xl font-bold text-primary mb-2">
                        Page Not Found
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Sorry, we couldn't find the page you're looking for. It might have
                        been moved, deleted, or you entered the wrong URL.
                    </p>
                </div>

                <div className="space-y-4">
                    <Link href="/home">
                        <Button className="w-full bg-primary hover:bg-gray-800" size="lg">
                            <Home className="h-5 w-5 m-2" />
                            Go Home
                        </Button>
                    </Link>

                    <Link href="/shop">
                        <Button
                            variant="outline"
                            className="w-full bg-transparent"
                            size="lg"
                        >
                            <Search className="h-5 w-5 m-2" />
                            Browse Products
                        </Button>
                    </Link>

                    <Button
                        variant="ghost"
                        onClick={() => window.history.back()}
                        className="w-full"
                        size="lg"
                    >
                        <ArrowLeft className="h-5 w-5 m-2" />
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
}
