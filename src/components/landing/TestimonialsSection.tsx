"use client";

import { Card, CardContent, Avatar } from "@mui/material";
import { Icon } from "@iconify/react";

const testimonials = [
  {
    name: "Epho Eugene",
    review:
      "This is personal review. I had some challenges and issues and I was worried and talking to the team here and there and to my....",
    rating: 5,
  },
  {
    name: "Totos Dinero",
    review:
      "Digitalpurse is the best card platform so far with it's anonymity made more comfortable to use to avoid restriction which made....",
    rating: 5,
  },
  {
    name: "Ken boogey",
    review:
      "Very good option to use if you don't want your card details out there, easy to use also but still have some kinks they can work out",
    rating: 5,
  },
  {
    name: "Mark Gyasi",
    review:
      "Takes few minutes to get your card done Their customer services is on point. They will resolve your issue perfectly...",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="flex flex-col gap-2.5 mb-16">
      <div
        className="flex gap-4 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 340,
              borderRadius: "24px",
              border: "1px solid #e4e4e4",
              boxShadow: "0px 4px 25px 0px rgba(0,0,0,0.07)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <div className="flex flex-col gap-3">
                {/* User Info */}
                <div className="flex items-center gap-1.5">
                  <Avatar
                    sx={{
                      width: 22,
                      height: 22,
                      backgroundColor: "#e5e7eb",
                      fontSize: 11,
                    }}
                  >
                    <Icon
                      icon="solar:user-bold"
                      width={11}
                      height={11}
                      className="text-gray-600"
                    />
                  </Avatar>
                  <span className="font-medium text-sm text-black font-[family-name:var(--font-dm-sans)]">
                    {testimonial.name}
                  </span>
                </div>

                {/* Review Text */}
                <p className="font-normal text-base text-gray-600 font-[family-name:var(--font-dm-sans)]">
                  {testimonial.review}
                </p>

                {/* Rating Stars */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icon
                      key={i}
                      icon="solar:star-bold"
                      width={16}
                      height={16}
                      className="text-amber-400"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
