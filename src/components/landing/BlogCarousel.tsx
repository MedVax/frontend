"use client";

import { Typography, Button, Card, CardContent, CardMedia } from "@mui/material";
import { Shell } from "../ui";
import { useRouter } from "next/navigation";
import { useGetTopBlogPostsQuery } from "@/apis/blog-api";
import { Icon as Iconify } from "@iconify/react";
import * as dfns from "date-fns";
import Link from "next/link";

export function BlogCarousel() {
  const router = useRouter();
  const { data: blogPostsData, isLoading } = useGetTopBlogPostsQuery({
    params: { limit: 10 },
  });

  const posts = blogPostsData?.data || [];

  if (isLoading) {
    return (
      <Shell component="section" id="blog" className="mt-20">
        <Typography variant="h4" className="font-semibold text-center mb-8">
          Latest Blog Posts
        </Typography>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="min-w-[300px] h-[400px] bg-gray-200 animate-pulse rounded-xl"
            />
          ))}
        </div>
      </Shell>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <Shell component="section" id="blog" className="mt-20">
      <div className="flex items-center justify-between mb-8">
        <Typography variant="h4" className="font-semibold">
          Latest Blog Posts
        </Typography>
        <Button
          variant="outlined"
          onClick={() => router.push("/blog")}
          endIcon={<Iconify icon="solar:arrow-right-linear" />}
        >
          View All
        </Button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="min-w-[320px] flex-shrink-0"
          >
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              {post.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={post.title}
                  className="object-cover"
                />
              )}
              <CardContent>
                <Typography
                  variant="h6"
                  className="font-semibold mb-2 line-clamp-2"
                >
                  {post.title}
                </Typography>
                {post.excerpt && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="mb-3 line-clamp-3"
                  >
                    {post.excerpt}
                  </Typography>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    {post.author && (
                      <span>
                        {post.author.firstName} {post.author.lastName}
                      </span>
                    )}
                  </div>
                  {post.publishedAt && (
                    <span>
                      {dfns.format(new Date(post.publishedAt), "MMM dd, yyyy")}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Shell>
  );
}

