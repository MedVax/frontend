import { ImageResponse } from "next/og";
import { BASE_URL } from "@/constants/env";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Fetch consultant data
async function getConsultant(id: string) {
    try {
        const response = await fetch(`${BASE_URL}/consultants/${id}`, {
            next: { revalidate: 3600 },
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

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const consultant = await getConsultant(id);

    if (!consultant) {
        // Return default image if consultant not found
        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 60,
                        background: "linear-gradient(135deg, #26532E 0%, #1a3d22 100%)",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                    }}
                >
                    Consultant Not Found
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    }

    const user = consultant.userProfile?.user;
    const name = user
        ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
        : "Consultant";
    const jobTitle = consultant.jobTitle || "Healthcare Consultant";

    // Use consultant avatar if available, otherwise use default avatar
    const defaultAvatarUrl = user?.id
        ? `https://api.dicebear.com/9.x/shapes/png?backgroundColor=26532E,f88c49,D9EEDD&seed=${user.id}`
        : `https://api.dicebear.com/9.x/shapes/png?backgroundColor=26532E,f88c49,D9EEDD&seed=${id}`;
    const imageUrl = user?.avatar || defaultAvatarUrl;

    // Ensure image URL is absolute
    const absoluteImageUrl = imageUrl.startsWith("http")
        ? imageUrl
        : `${BASE_URL || "https://staging.medvaxhealth.com"}${imageUrl}`;

    // Fetch the avatar image and convert to base64 data URL for ImageResponse
    let avatarDataUrl = absoluteImageUrl;
    try {
        const imageResponse = await fetch(absoluteImageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; MedVax/1.0)',
            },
        });

        if (imageResponse.ok) {
            const arrayBuffer = await imageResponse.arrayBuffer();
            const base64 = Buffer.from(arrayBuffer).toString('base64');
            const contentType = imageResponse.headers.get('content-type') || 'image/png';
            avatarDataUrl = `data:${contentType};base64,${base64}`;
        }
    } catch (error) {
        // If fetch fails, fallback to URL (might not work but won't break)
        console.error('Failed to fetch avatar image:', error);
    }

    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    backgroundColor: "#0a0a0a",
                }}
            >
                {/* Left Section - Text Content */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "80px",
                        width: "66.67%",
                        height: "100%",
                        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
                        position: "relative",
                    }}
                >
                    {/* Subtle gradient overlay */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background:
                                "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 50%)",
                        }}
                    />

                    {/* Name and Title */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                            zIndex: 1,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 56,
                                fontWeight: 700,
                                color: "white",
                                lineHeight: 1.2,
                                letterSpacing: "-0.02em",
                            }}
                        >
                            {name}
                        </div>
                        <div
                            style={{
                                fontSize: 32,
                                fontWeight: 400,
                                color: "#e0e0e0",
                                lineHeight: 1.3,
                            }}
                        >
                            {jobTitle}
                        </div>
                        <div
                            style={{
                                fontSize: 24,
                                fontWeight: 500,
                                color: "#f88c49",
                                marginTop: "8px",
                            }}
                        >
                            MedVax Consultants
                        </div>

                        {/* Book Now Button */}
                        <div
                            style={{
                                marginTop: "32px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{
                                    background: "linear-gradient(135deg, #E91D74 0%, #BE185D 100%)",
                                    padding: "16px 32px",
                                    borderRadius: "8px",
                                    fontSize: 20,
                                    fontWeight: 600,
                                    color: "white",
                                    boxShadow: "0 4px 12px rgba(233, 29, 116, 0.3)",
                                }}
                            >
                                Book Now
                            </div>
                        </div>
                    </div>
                </div>

                {/* Diagonal Stripe */}
                <div
                    style={{
                        position: "absolute",
                        left: "66.67%",
                        top: 0,
                        width: "8px",
                        height: "100%",
                        background: "linear-gradient(135deg, #f88c49 0%, #e67e3a 100%)",
                        transform: "skewX(-15deg)",
                        transformOrigin: "top left",
                        zIndex: 2,
                    }}
                />

                {/* Right Section - Avatar */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "33.33%",
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                        backgroundColor: "#0a0a0a",
                    }}
                >
                    {/* Avatar Image */}
                    {/* Using data URL for reliable image loading */}
                    <img
                        src={avatarDataUrl}
                        alt={name}
                        width={500}
                        height={630}
                        style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
