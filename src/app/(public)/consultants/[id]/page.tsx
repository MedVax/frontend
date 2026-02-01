import type { Metadata } from "next";
import { BASE_URL } from "@/constants/env";
import PublicConsultantProfile from "./features/PublicConsultantProfile";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Fetch consultant data for metadata
async function getConsultant(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/consultants/${id}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
      headers: {
        "Content-Type": "application/json",
      },
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

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const consultant = await getConsultant(id);

  if (!consultant) {
    return {
      title: "Consultant Not Found | MedVax",
      description: "The consultant profile you're looking for could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const user = consultant.userProfile?.user;
  const name = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
    : "Consultant";
  const jobTitle = consultant.jobTitle || "Healthcare Consultant";
  const fullTitle = `${name} - ${jobTitle} | MedVax Consultants`;

  const bio = consultant.bio || "";
  const description = bio
    ? `${name} is a ${jobTitle} at MedVax. ${bio.substring(0, 150)}...`
    : `${name} is a ${jobTitle} at MedVax. Book a consultation session today.`;

  const imageUrl = user?.avatar || null;
  const expertise = consultant.areaOfExpertise || [];
  const yearsOfExperience = consultant.yearsOfExperience;
  const rate = consultant.rate;

  const keywords = [
    name,
    jobTitle,
    ...expertise,
    "MedVax",
    "healthcare consultant",
    "medical consultation",
    "telemedicine",
    "online consultation",
    "healthcare professional",
    consultant.faith || "",
  ].filter(Boolean);

  const canonicalUrl = `/consultants/${id}`;

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: "MedVax" }],
    creator: "MedVax",
    publisher: "MedVax",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(BASE_URL || "https://medvax.com"),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      type: "profile",
      url: canonicalUrl,
      siteName: "MedVax",
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: `${name} - ${jobTitle}`,
          },
        ],
      }),
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: "@medvax",
      ...(imageUrl && {
        images: [imageUrl],
      }),
    },
    other: {
      ...(yearsOfExperience && {
        "consultant:years_of_experience": String(yearsOfExperience),
      }),
      ...(rate && {
        "consultant:rate": String(rate),
        "consultant:currency": "NGN",
      }),
      ...(expertise.length > 0 && {
        "consultant:expertise": expertise.join(", "),
      }),
      ...(consultant.faith && {
        "consultant:faith": consultant.faith,
      }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const consultant = await getConsultant(id);

  // Generate structured data for SEO
  const structuredData = consultant
    ? {
      "@context": "https://schema.org",
      "@type": "Person",
      name: consultant.userProfile?.user
        ? `${consultant.userProfile.user.firstName} ${consultant.userProfile.user.lastName}`
        : "Consultant",
      jobTitle: consultant.jobTitle || "Healthcare Consultant",
      description: consultant.bio || "",
      image: consultant.userProfile?.user?.avatar || "",
      email: consultant.userProfile?.user?.email || "",
      ...(consultant.areaOfExpertise && {
        knowsAbout: consultant.areaOfExpertise,
      }),
      ...(consultant.yearsOfExperience && {
        yearsOfExperience: consultant.yearsOfExperience,
      }),
      ...(consultant.rate && {
        offers: {
          "@type": "Offer",
          price: consultant.rate,
          priceCurrency: "NGN",
          availability: consultant.hasSetAvailability
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        },
      }),
      worksFor: {
        "@type": "Organization",
        name: "MedVax",
        url: BASE_URL || "",
      },
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
      <PublicConsultantProfile consultantId={id} />
    </>
  );
}

