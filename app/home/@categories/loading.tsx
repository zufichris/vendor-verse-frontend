import { Skeleton } from "@/components/ui/skeleton";

export default function() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="  mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
                </div>
                <div className="grid md:grid-cols-4 gap-8">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="aspect-[4/3]" />
                    ))}
                </div>
            </div>
        </section>
    );
}
