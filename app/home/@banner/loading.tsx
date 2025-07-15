import { Skeleton } from "@/components/ui/skeleton";

export default function BannersLoading() {
    return (
        <section className="relative h-screen overflow-hidden bg-gray-200 animate-pulse">
            <Skeleton className="absolute inset-0 w-full h-full rounded-none" />

            <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="text-center max-w-5xl w-full space-y-4">
                    <Skeleton className="h-6 w-48 mx-auto" /> {/* Subtitle */}
                    <Skeleton className="h-16 w-3/4 mx-auto" /> {/* Title */}
                    <Skeleton className="h-8 w-2/3 mx-auto" /> {/* Description */}
                    <div className="mt-8 md:mt-10">
                        <Skeleton className="h-12 w-40 mx-auto rounded-full" />{" "}
                        {/* CTA Button */}
                    </div>
                </div>
            </div>

            {/* Navigation Arrows Placeholder */}
            <Skeleton className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full" />
            <Skeleton className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full" />

            {/* Dots Navigation Placeholder */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="w-3 h-3 rounded-full" />
                ))}
            </div>
        </section>
    );
}
