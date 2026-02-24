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
    `Buy ${product.name} online at MedVax. ${product.requiresPrescription
      ? "Prescription required."
      : "Available without prescription."
    } Fast delivery and trusted healthcare.`;

  // Format price
  const price = product.price
    ? new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: product.currency || "NGN",
      }).format(product.price)
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
      ...(price && { "product:price:amount": String(product.price) }),
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
  const product = await getProduct(id);

  // Generate structured data for SEO (Schema.org Product)
  const structuredData = product
    ? {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description || "",
      image: product.images?.[0] || product.image || "",
      sku: product.sku || "",
      brand: {
        "@type": "Brand",
        name: "MedVax",
      },
      offers: product.price
        ? {
            "@type": "Offer",
            price: product.price,
            priceCurrency: product.currency || "NGN",
            availability: "https://schema.org/InStock",
            url: `${BASE_URL || "https://staging.medvaxhealth.com"}/products/${id}`,
          }
        : undefined,
      ...(product.category && {
        category: product.category.name,
      }),
      ...(product.ingredients && product.ingredients.length > 0 && {
        additionalProperty: product.ingredients.map((ingredient: string) => ({
          "@type": "PropertyValue",
          name: "ingredient",
          value: ingredient,
        })),
      }),
    }
    : null;

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <ProductDetail id={id} />
    </>
  );
}
