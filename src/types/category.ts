import { ServerResponse } from "./global";

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  slug: string;
  image?: string | null;
  parentId?: string | null;
  parent?: CategoryParent | null;
  children?: Category[];
  createdAt: string;
  updatedAt: string;
  _count?: {
    products: number;
    children: number;
  };
}

export interface CategoryParent {
  id: string;
  name: string;
  slug: string;
}

export interface CategoryCount {
  products: number;
  children?: number;
}

export type CategoryResponse = ServerResponse<Category>;
export type CategoriesResponse = ServerResponse<Category[]>;

export type CreateCategoryRequest = {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
};

export type UpdateCategoryRequest = {
  name?: string;
  slug?: string;
  description?: string;
  parentId?: string | null;
};

export type BulkCreateCategoryRequest = {
  categories: CreateCategoryRequest[];
};

