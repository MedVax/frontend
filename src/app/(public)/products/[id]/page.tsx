import type { Metadata } from "next";
import { BASE_URL } from "@/constants/env";
import ProductDetail from "../features/ProductDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Fetch product data for metadata
async function getProduct(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data?.data || null;
  } catch {
    return null;
  }
}

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found | MedVax",
      description: "The product you're looking for could not be found.",
    };
  }

  const title = `${product.name} | MedVax`;
  const description =
    product.description ||
    `Buy ${product.name} online at MedVax. ${
      product.requiresPrescription
        ? "Prescription required."
        : "Available without prescription."
    } Fast delivery and trusted healthcare.`;

  // Format price
  const price = product.price
    ? new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: product.currency || "NGN",
      }).format(product.price / 100)
    : null;

  const imageUrl = product.images?.[0] || product.image || null;
  const categoryName = product.category?.name || "";

  return {
    title,
    description,
    keywords: [
      product.name,
      categoryName,
      "pharmacy",
      "medication",
      "healthcare",
      "MedVax",
      ...(product.ingredients || []),
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: "website",
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl && {
        images: [imageUrl],
      }),
    },
    alternates: {
      canonical: `/products/${id}`,
    },
    other: {
      ...(price && { "product:price:amount": String(product.price / 100) }),
      ...(product.currency && { "product:price:currency": product.currency }),
      ...(product.sku && { "product:sku": product.sku }),
      ...(product.requiresPrescription !== undefined && {
        "product:requires_prescription": String(product.requiresPrescription),
      }),
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <ProductDetail id={id} />;
}
