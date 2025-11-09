import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/product/product-details";
import type { Product } from "@/types/product";
import { Metadata } from "next";
import { Api } from "@/utils/api";

async function getProduct(slug: string) {
  const res = await Api.get<Product>(`/products/slug/${slug}`);
  return res;
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug)
  const [pdtSlug, variantSlug] = decoded.split(':')

  const res = await getProduct(pdtSlug);

  const selectedVariant = (res.data?.variants || []).find(itm => itm.slug === variantSlug)

  if (!res.success) {
    notFound();
  }

  return (
    <div className="min-h-screen mt-10  pt-6 bg-background">
      <ProductDetails product={res.data!} selectedVariant={selectedVariant!}  />
    </div>
  );
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug)
  const [pdtSlug] = decoded.split(':')
  const res = await getProduct(pdtSlug);

  if (!res.success) {
    return notFound();
  }
  const product = res.data!;
  return {
    title: product.seo?.title || product.name,
    description: product.seo?.description || product.description,
    keywords: product.seo?.metaKeywords?.join(", "),
    openGraph: {
      title: product.seo?.title || product.name,
      description: product.seo?.title || product.description,
      images: product.images.map((img) => ({
        url: img.url,
        alt: img.altText,
      })),
    },
  };
}
