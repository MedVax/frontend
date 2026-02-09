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
    try {
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

        // Prepare fallback with initials
        const initials = name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);

        // Try to verify image is accessible before using it
        // ImageResponse can handle direct URLs if they're publicly accessible
        let useImage = false;
        let finalImageUrl = absoluteImageUrl;

        try {
            // Quick HEAD request to verify image exists and is accessible
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout

            const checkResponse = await fetch(absoluteImageUrl, {
                method: 'HEAD',
                signal: controller.signal,
                headers: {
                    'User-Agent': 'Mozilla/5.0',
                },
            });

            clearTimeout(timeoutId);

            if (checkResponse.ok) {
                const contentType = checkResponse.headers.get('content-type');
                // Only use if it's an image type
                if (contentType?.startsWith('image/')) {
                    useImage = true;
                }
            }
        } catch (error) {
            // If check fails, use initials fallback
            useImage = false;
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
                        {useImage ? (
                            /* Avatar Image - Use direct URL (ImageResponse handles external URLs) */
                            <img
                                src={finalImageUrl}
                                alt={name}
                                width={500}
                                height={630}
                                style={{
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        ) : (
                            /* Fallback: Initials on gradient background */
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "linear-gradient(135deg, #26532E 0%, #1a3d22 100%)",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 120,
                                        fontWeight: 700,
                                        color: "white",
                                        textAlign: "center",
                                    }}
                                >
                                    {initials}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (error) {
        // Ultimate fallback - return a simple error image if anything fails
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
                    MedVax Consultants
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    }
}
