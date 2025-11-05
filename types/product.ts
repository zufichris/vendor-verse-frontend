export type ProductStatus = "active" | "inactive" | "draft" | "archived" | "deleted";

export type ProductVisibility = "public" | "private" | "hidden";

export type ProductCondition = "new" | "used" | "refurbished";

export type ProductType = "simple" | "configurable" | "virtual" | "downloadable";

export interface ImageMeta {
  url: string;
  altText?: string;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit?: string;
}

export interface Seo {
  title?: string;
  description?: string;
  metaKeywords?: string[];
  canonicalUrl?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  image?: ImageMeta;
  seo?: Seo;
  createdAt: string;
  updatedAt?: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  name?: string;
  slug: string;
  colorCode: string;
  sizes: string[];
  price: number;
  currency: string;
  discountPrice?: number;
  discountPercentage?: number;
  discountFixedAmount?: number;
  attributes?: Record<string, string>;
  stockQuantity: number;
  isInStock: boolean;
  images: ImageMeta[];
  thumbnail: ImageMeta;
  weight?: number;
  weightUnit?: string;
  dimensions?: Dimensions;
  createdAt: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  slug: string;
  sku: string;
  price: number;
  currency: string;
  discountPercentage?: number;
  discountFixedAmount?: number;
  discountStartDate?: string;
  discountEndDate?: string;
  categoryId: string;
  category?: ProductCategory;
  brand?: string;
  tags?: string[];
  images: ImageMeta[];
  thumbnail: ImageMeta;
  type: ProductType;
  status: ProductStatus;
  visibility: ProductVisibility;
  condition?: ProductCondition;
  featured: boolean;
  stockQuantity: number;
  isInStock: boolean;
  variants?: ProductVariant[];
  weight?: number;
  weightUnit?: string;
  dimensions?: Dimensions;
  seo?: Seo;
  createdById: string;
  updatedById?: string;
  createdAt: string;
  updatedAt?: string;
  isDeleted?: boolean;
  deletedAt?: string;
  deletedById?: string;
}

export type ProductCategoryResponseDto = ProductCategory;


export type ProductAnalytics = {
  lowStock: number
  totalStock: number
  activeStock: number
}