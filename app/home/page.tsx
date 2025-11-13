import { ProductCard } from "@/components/product/product-card";
import { shuffleVariants } from "@/lib/utils";
import type { Product } from "@/types/product";
import { Api, QueryResponse } from "@/utils/api";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";


export default async function HomePage() {
  const res = await Api.get<QueryResponse<Product>>("/products/recommended?limit=12&shuffle=true");
  if (!res.success) {
    return <div>Error Getting Products</div>;
  }

  const variants = res.data!.data.map(itm => {
          const vars = (itm.variants || []).map(vr => ({
              ...vr,
              discountStartDate: itm.discountStartDate,
              status: itm.status,
              condition: itm.condition,
              featured: itm.featured,
              brand: itm.brand,
              discountEndDate: itm.discountEndDate,
              productName: itm.name,
              productSlug: itm.slug,
              description: itm.description,
              category: itm.category,
              colorsMap: (itm.variants || []).map(col =>({
                  name: col.name || '',
                  slug: col.slug || '',
                  colorCode: col?.colorCode || '',
              }))
          }))
  
          return vars
      }).flat()
  
      const shuffledGroups = shuffleVariants(variants)

  return (
    <section className="py-16">
      <div className="mx-auto px-4">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products, carefully
            curated for quality and style.
          </p>
        </div>

        {/* <Tabs className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="new">New Arrivals</TabsTrigger>
            <TabsTrigger value="sale">On Sale</TabsTrigger>
          </TabsList>
        </Tabs> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {shuffledGroups.slice(0, 4).map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} showQuickView={true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
