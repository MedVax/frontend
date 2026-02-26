import { ServerResponse, PaginationServerResponse } from "./global";
import { Category } from "./category";
import { Brand } from "./brand";

export enum ProductType {
  OTC = "OTC",
  POM = "POM",
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string | null;
  price: number; // in minor currency units (kobo/cents)
  currency: string;
  requiresPrescription: boolean;
  productType: ProductType;
  categoryId?: string | null;
  category?: Category | null;
  brandId?: string | null;
  brand?: Brand | null;
  images: string[];
  dosages: string[];
  packageSizes: string[];
  howToUse?: string | null;
  ingredients: string[];
  pharmacyAdvise?: string | null;
  specification?: string | null;
  isActive: boolean;
  featured: boolean;
  stockQuantity: number;
  stockReserved: number;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export type ProductResponse = ServerResponse<Product>;
export type ProductsResponse = ServerResponse<Product[]>;
export type PaginatedProductsResponse = PaginationServerResponse<Product[]>;

export interface GetProductsQuery {
  search?: string;
  brandId?: string;
  categoryId?: string;
  productType?: ProductType;
  requiresPrescription?: boolean;
  isActive?: boolean;
  availability?: string;
  skip?: number;
  take?: number;
  orderBy?: string;
}

export interface CreateProductRequest {
  name: string;
  sku: string;
  description?: string;
  brandId?: string;
  price: number;
  currency?: string;
  requiresPrescription?: boolean;
  productType?: ProductType;
  categoryId?: string;
  dosages?: string[];
  packageSizes?: string[];
  howToUse?: string;
  ingredients?: string[];
  pharmacyAdvise?: string;
  specification?: string;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}
