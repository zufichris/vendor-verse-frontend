import { getProductById } from "@/lib/actions/products";
import { ProductDetails } from "./component";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) {
    return notFound();
  }
  return {
    title: `Shop "${product.name}" on VendorVerse`,
    description: product.description,
    openGraph: {
      images: product.images.map((i) => ({
        url: i,
        height: 400,
        width: 300,
      })),
    },
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) {
    return notFound();
  }
  return <ProductDetails product={product} />;
}
