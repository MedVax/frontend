"use client";

import { use } from "react";
import { Typography, Card, CardContent, Avatar, Chip, Button, Alert } from "@mui/material";
import { Shell } from "@/components/ui";
import { useGetBlogPostBySlugQuery } from "@/apis/blog-api";
import * as dfns from "date-fns";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = use(params);
  const { data: blogPostData, isLoading, error } = useGetBlogPostBySlugQuery({
    path: { slug },
  });

  const post = blogPostData?.data;

  // Set SEO metadata
  useEffect(() => {
    if (post) {
      document.title = post.metaTitle || post.title;

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          post.metaDescription || post.excerpt || ""
        );
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = post.metaDescription || post.excerpt || "";
        document.head.appendChild(meta);
      }

      // Update Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute("content", post.metaTitle || post.title);
      } else {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:title");
        meta.content = post.metaTitle || post.title;
        document.head.appendChild(meta);
      }

      const ogDescription = document.querySelector(
        'meta[property="og:description"]'
      );
      if (ogDescription) {
        ogDescription.setAttribute(
          "content",
          post.metaDescription || post.excerpt || ""
        );
      } else {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:description");
        meta.content = post.metaDescription || post.excerpt || "";
        document.head.appendChild(meta);
      }

      if (post.image) {
        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) {
          ogImage.setAttribute("content", post.image);
        } else {
          const meta = document.createElement("meta");
          meta.setAttribute("property", "og:image");
          meta.content = post.image;
          document.head.appendChild(meta);
        }
      }
    }
  }, [post]);

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <Shell component="main" className="py-12">
          <div className="max-w-4xl mx-auto">
            <div className="h-64 bg-gray-200 animate-pulse rounded-xl mb-6" />
            <div className="h-8 bg-gray-200 animate-pulse rounded mb-4" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-8" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-200 animate-pulse rounded"
                />
              ))}
            </div>
          </div>
        </Shell>
      </div>
    );
  }

  if (error || (!post)) {
    return (
      <div className="bg-white min-h-screen">
        <Shell component="main" className="py-12">
          <div className="max-w-4xl mx-auto text-center">
            <Alert severity="error" className="mb-4">
              Blog post not found
            </Alert>
            <Typography variant="h6" className="mb-4">
              The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              href="/blog"
            >
              Back to Blog
            </Button>
          </div>
        </Shell>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Shell component="main" className="py-12">
        <article className="max-w-4xl mx-auto">
          {post.image && (
            <div className="mb-8">
              <Image
                src={post.image}
                alt={post.title}
                width={1200}
                height={400}
                className="w-full h-[400px] object-cover rounded-xl"
              />
            </div>
          )}

          <header className="mb-8">
            <Typography variant="h3" className="font-semibold mb-4">
              {post.title}
            </Typography>

            {post.excerpt && (
              <Typography
                variant="h6"
                color="text.secondary"
                className="mb-6"
              >
                {post.excerpt}
              </Typography>
            )}

            <div className="flex items-center gap-4 mb-4">
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.avatar ? (
                    <Avatar src={post.author.avatar} />
                  ) : (
                    <Avatar>
                      {post.author.firstName?.[0]}
                      {post.author.lastName?.[0]}
                    </Avatar>
                  )}
                  <div>
                    <Typography variant="body2" className="font-medium">
                      {post.author.firstName} {post.author.lastName}
                    </Typography>
                    {post.publishedAt && (
                      <Typography variant="caption" color="text.secondary">
                        {dfns.format(new Date(post.publishedAt), "MMMM dd, yyyy")}
                      </Typography>
                    )}
                  </div>
                </div>
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag: string) => (
                  <Chip key={tag} label={tag} size="small" />
                ))}
              </div>
            )}
          </header>

          <Card>
            <CardContent>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
                    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
                    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
                    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
                    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
                    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
                    .replace(/\n/gim, "<br />"),
                }}
              />
            </CardContent>
          </Card>

          <div className="mt-8 pt-8 border-t">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Views: {post.views}</span>
              {post.updatedAt && (
                <span>
                  Last updated:{" "}
                  {dfns.format(new Date(post.updatedAt), "MMMM dd, yyyy")}
                </span>
              )}
            </div>
          </div>
        </article>
      </Shell>
    </div>
  );
}

