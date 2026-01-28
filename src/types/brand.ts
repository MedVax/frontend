import { ServerResponse } from "./global";

export interface Brand {
  id: string;
  name: string;
  description?: string | null;
  logo?: string | null;
  website?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    products: number;
  };
}

export type BrandResponse = ServerResponse<Brand>;
export type BrandsResponse = ServerResponse<Brand[]>;

export type CreateBrandRequest = {
  name: string;
  description?: string;
  website?: string;
  isActive?: boolean;
};

export type UpdateBrandRequest = {
  name?: string;
  description?: string;
  website?: string;
  isActive?: boolean;
};

