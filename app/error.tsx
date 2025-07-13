"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="mb-8">
                    <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-black mb-2">
                        Something went wrong!
                    </h1>
                    <p className="text-gray-600 mb-8">
                        We encountered an unexpected error. Please try again or contact
                        support if the problem persists.
                    </p>
                </div>

                <div className="space-y-4">
                    <Button
                        onClick={reset}
                        className="w-full bg-black hover:bg-gray-800"
                        size="lg"
                    >
                        <RefreshCw className="h-5 w-5 mr-2" />
                        Try Again
                    </Button>

                    <Link href="/home">
                        <Button
                            variant="outline"
                            className="w-full bg-transparent"
                            size="lg"
                        >
                            <Home className="h-5 w-5 mr-2" />
                            Go Home
                        </Button>
                    </Link>
                </div>

                {process.env.NODE_ENV === "development" && (
                    <details className="mt-8 text-left">
                        <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                            Error Details (Development)
                        </summary>
                        <pre className="mt-2 text-xs text-red-600 bg-red-50 p-4 rounded overflow-auto">
                            {error.message}
                        </pre>
                    </details>
                )}
            </div>
        </div>
    );
}
