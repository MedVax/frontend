export type ProductStock = {
    pharmacyId: number;
    quantity: number;
};

export type Product = {
    id: number;
    name: string;
    sku: string;
    description: string;
    price: number;
    currency: string;
    requiresPrescription: boolean;
    images: string[];
    category: string;
    stock: ProductStock[];
    createdAt: string;
    updatedAt: string;
};

export type ProductListResponse = {
    data: Product[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
};
