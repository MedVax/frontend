"use client";

import { useState } from "react";
import { Typography, Card, CardContent, CardMedia, TextField, InputAdornment, Pagination } from "@mui/material";
import { Shell } from "@/components/ui";
import { useGetBlogPostsQuery } from "@/apis/blog-api";
import { Icon as Iconify } from "@iconify/react";
import * as dfns from "date-fns";
import Link from "next/link";
import useDebouncedState from "@/hooks/use-debounced-state";
import Image from "next/image";

export default function BlogListPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deferredSearch] = useDebouncedState(search, {
    enableReInitialize: true,
    wait: 500,
  });

  const pageSize = 12;
  const skip = (page - 1) * pageSize;

  const { data: blogPostsData, isLoading } = useGetBlogPostsQuery({
    params: {
      skip,
      take: pageSize,
      published: true,
      search: deferredSearch || undefined,
    },
  });

  const posts = blogPostsData?.data?.data || [];
  const totalPages = blogPostsData?.data?.pages || 0;

  return (
    <div className="bg-white min-h-screen">
      <Shell component="main" className="py-12">
        <div className="mb-8">
          <Typography variant="h3" className="font-semibold mb-4">
            Blog
          </Typography>
          <Typography variant="body1" color="text.secondary" className="mb-6">
            Stay updated with the latest health tips, medical news, and wellness advice
          </Typography>
          <TextField
            fullWidth
            placeholder="Search blog posts..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="solar:magnifer-linear" />
                </InputAdornment>
              ),
            }}
            className="max-w-md"
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[400px] bg-gray-200 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <Typography variant="h6" color="text.secondary">
              No blog posts found
            </Typography>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    {post.image && (
                      <CardMedia
                        sx={{ height: 200 }}
                        image={post.image}
                        title={post.title}
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
                            {dfns.format(
                              new Date(post.publishedAt),
                              "MMM dd, yyyy"
                            )}
                          </span>
                        )}
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                />
              </div>
            )}
          </>
        )}
      </Shell>
    </div>
  );
}

