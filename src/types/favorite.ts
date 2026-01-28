import { Product } from "./product";
import { ServerResponse, PaginationServerResponse } from "./global";

export interface Favorite {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  createdAt: string;
  updatedAt: string;
}

export type FavoriteResponse = ServerResponse<Favorite>;
export type FavoritesResponse = ServerResponse<Favorite[]>;
export type PaginatedFavoritesResponse = PaginationServerResponse<Favorite[]>;

export interface AddFavoriteRequest {
  productId: string;
}

export interface CheckFavoriteResponse {
  data: boolean;
}

