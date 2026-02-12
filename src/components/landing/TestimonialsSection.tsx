"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, Avatar, Typography, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { Shell } from "../ui";
import useEmblaCarousel from "embla-carousel-react";
import clsx from "clsx";

const testimonials = [
  {
    name: "Esther .I.",
    location: "Delta State",
    review:
      "Accessing gynecological care was a struggle for me. I was matched to a Dr on MedVax and was able to share my symptoms privately, and I also got my e-prescription from the comfort of my home. I highly recommend Medvax",
    rating: 5,
  },
  {
    name: "Khadijat",
    location: "Abuja",
    review:
      "This is my second time ordering medications from Medvax, I was out of town and Medvax delivered my husband's medications to him quickly. Thank you Medvax.",
    rating: 5,
  },
  {
    name: "Mr. E",
    location: "Anonymous",
    review:
      "I've been experiencing Erectile dysfunction, not just the physical symptoms but the mental torture, my consultation with the MedVax Doctor, was very helpful, he modified my diet, gave me an excercise plan and prescribed some supplements. I highly recommend",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 3,
    breakpoints: {
      "(max-width: 768px)": { slidesToScroll: 1 },
      "(max-width: 1024px)": { slidesToScroll: 2 },
    },
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    handleSelect(); // Initial state
    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleSelect);

    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleSelect);
    };
  }, [emblaApi]);

  return (
    <Shell component="section" className="flex flex-col gap-6 py-8 bg-white" id="testimonials">
      <Typography variant="h4" className="font-semibold! text-center mb-4">
        Reviews
      </Typography>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-8px)] md:flex-[0_0_calc(33.333%-11px)]"
              >
                <Card
                  sx={{
                    border: "1px solid #e4e4e4",
                    // filter: "drop-shadow(0px 4px 25px #00000012) !important",
                    boxShadow: "none",
                    p: 0,
                    height: "100%",
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <div className="flex flex-col gap-3">
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
                            icon="solar:users-group-rounded-linear"
                            width={11}
                            height={11}
                            className="text-gray-600"
                          />
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm text-black">
                            {testimonial.name}
                          </span>
                          {testimonial.location && (
                            <span className="font-normal text-xs text-gray-500">
                              {testimonial.location}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="font-normal text-base text-gray-600">
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
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {testimonials.length > 1 && (
          <>
            <IconButton
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              variant="soft"
              color="inherit"
              className={clsx(
                "absolute! sm:-left-5 left-0 top-1/2 -translate-y-1/2 z-10",
                !canScrollPrev && "hidden!"
              )}
            >
              <Icon
                icon="ic:baseline-navigate-before"
                width={24}
                height={24}
                className="text-gray-500"
              />
            </IconButton>
            <IconButton
              onClick={scrollNext}
              disabled={!canScrollNext}
              variant="soft"
              color="inherit"
              className={clsx(
                "absolute! sm:-right-5 right-0 top-1/2 -translate-y-1/2 z-10",
                !canScrollNext && "hidden!"
              )}
            >
              <Icon
                icon="ic:baseline-navigate-next"
                width={24}
                height={24}
                className="text-gray-500"
              />
            </IconButton>
          </>
        )}
      </div>
    </Shell>
  );
}
