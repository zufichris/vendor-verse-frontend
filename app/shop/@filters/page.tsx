import type { ProductCategory } from "@/types/product";
import { Api, QueryResponse } from "@/utils/api";
import { FilterForm } from "./form";

interface FiltersPageProps {
    searchParams: Promise<{
        category?: string;
        brand?: string;
        min_price?: string;
        max_price?: string;
        search?: string;
    }>;
}

export default async function FiltersPage({ searchParams }: FiltersPageProps) {
    const params = await searchParams;

    const [categoriesRes, brandsRes] = await Promise.all([
        Api.get<QueryResponse<ProductCategory>>("/products/categories"),
        Api.get<string[]>("/products/brands"),
    ]);

    const categories = categoriesRes.success ? categoriesRes.data.data : [];
    const brands = brandsRes.success ? brandsRes.data : [];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <FilterForm
                    categories={categories || []}
                    brands={brands || []}
                    initialFilters={params}
                />
            </div>
        </div>
    );
}
