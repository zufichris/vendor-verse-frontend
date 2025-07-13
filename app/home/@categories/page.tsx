import { Button } from "@/components/ui/button";
import { ProductCategory } from "@/types/product";
import { Api } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";

export default async function() {
    const res = await Api.get<ProductCategory[]>("/products/categories");
    if (!res.success) {
        return res.message;
    }
    return (
        <section className="py-16">
            <div className="  mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Shop by Category
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our carefully curated categories to find exactly what you're
                        looking for.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {res?.data?.map((category, index) => (
                        <div
                            key={category.id}
                            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="aspect-[4/3] relative">
                                <Image
                                    src={category.image?.url || "/placeholder.svg"}
                                    alt={category.image?.altText || category.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />

                                <div className="absolute inset-0 flex items-end p-6">
                                    <div className="text-primary-foreground">
                                        <h3 className="text-2xl md:text-3xl font-bold mb-2">
                                            {category.name}
                                        </h3>
                                        <p className="text-lg mb-4 opacity-90">{category.description}</p>
                                        <Link href={`/products?category=${category.id}`}>
                                            <Button
                                                variant="outline"
                                                className="bg-primary-foreground/10 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-gray-900 backdrop-blur-sm transition-all duration-300"
                                            >
                                                Shop Now
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
