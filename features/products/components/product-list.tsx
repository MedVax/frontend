"use client";

import { useProducts } from "@/features/products";
import { formatCurrency } from "@/lib/utils";

export function ProductList() {
  const { data, isLoading, error } = useProducts({ page: 1, limit: 20 });

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data?.data.map((product) => (
        <div key={product.id} className="rounded-lg border p-4">
          {product.images[0] && (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-48 w-full object-cover rounded-md"
            />
          )}
          <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
          <p className="mt-2 text-sm text-gray-600">{product.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-bold">
              {formatCurrency(product.price, product.currency)}
            </span>
            {product.requiresPrescription && (
              <span className="text-xs text-orange-600">
                Prescription Required
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
