"use client";
import { useSearchParams, usePathname } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Grid, List } from "lucide-react";
import Link from "next/link";

export function ViewModeToggle({ currentMode }: { currentMode: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const getUrl = (mode: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("view_mode", mode);
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex border rounded-md">
            <Link
                href={getUrl("grid")}
                className={`p-2 ${currentMode === "grid" ? "bg-gray-100" : ""}`}
            >
                <Grid className="h-4 w-4" />
            </Link>
            <Link
                href={getUrl("list")}
                className={`p-2 ${currentMode === "list" ? "bg-gray-100" : ""}`}
            >
                <List className="h-4 w-4" />
            </Link>
        </div>
    );
}

export function ShopPagination({
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
}: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        return `${pathname}?${params.toString()}`;
    };

    const startPage = Math.max(1, Math.min(totalPages - 4, currentPage - 2));

    return (
        <Pagination>
            <PaginationContent>
                {hasPreviousPage && (
                    <PaginationItem>
                        <PaginationPrevious href={createPageUrl(currentPage - 1)} />
                    </PaginationItem>
                )}

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNumber = startPage + i;
                    if (pageNumber > totalPages) return null;
                    return (
                        <PaginationItem key={pageNumber}>
                            <PaginationLink
                                href={createPageUrl(pageNumber)}
                                isActive={pageNumber === currentPage}
                            >
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                {hasNextPage && (
                    <PaginationItem>
                        <PaginationNext href={createPageUrl(currentPage + 1)} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
