import { medvaxApi } from "@/configs/store-query";
import { QueryRequest, ServerResponse, PaginationServerResponse } from "@/types/global";
import * as RtkqTag from "constants/data-tag";

const TAG = "/blog";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  image?: string | null;
  content: string;
  excerpt?: string | null;
  authorId: string;
  published: boolean;
  publishedAt?: string | null;
  views: number;
  metaTitle?: string | null;
  metaDescription?: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string | null;
  };
}

export type BlogPostResponse = ServerResponse<BlogPost>;
export type BlogPostsResponse = PaginationServerResponse<BlogPost[]>;

export const blogApi = medvaxApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogPosts: builder.query<
      BlogPostsResponse,
      QueryRequest<void, { skip?: number; take?: number; published?: boolean; search?: string; tag?: string }, void>
    >({
      query: ({ params, ...config }) => {
        const queryParams: Record<string, any> = {
          skip: params?.skip || 0,
          take: params?.take || 20,
        };

        if (params?.published !== undefined) {
          queryParams.published = params.published;
        }
        if (params?.search) {
          queryParams.search = params.search;
        }
        if (params?.tag) {
          queryParams.tag = params.tag;
        }

        return {
          url: TAG,
          params: queryParams,
          ...config,
        };
      },
      providesTags: [RtkqTag.BLOG],
    }),

    getTopBlogPosts: builder.query<
      ServerResponse<BlogPost[]>,
      QueryRequest<void, { limit?: number }, void>
    >({
      query: ({ params, ...config }) => ({
        url: `${TAG}/top`,
        params: {
          limit: params?.limit || 10,
        },
        ...config,
      }),
      providesTags: [RtkqTag.BLOG],
    }),

    getBlogPostBySlug: builder.query<
      BlogPostResponse,
      QueryRequest<void, void, { slug: string }>
    >({
      query: ({ path, ...config }) => ({
        url: `${TAG}/slug/${path?.slug}`,
        ...config,
      }),
      providesTags: (result, error, { path }) => {
        return [{ type: RtkqTag.BLOG, id: path?.slug }];
      },
    }),
  }),
});

export const {
  useGetBlogPostsQuery,
  useGetTopBlogPostsQuery,
  useGetBlogPostBySlugQuery,
} = blogApi;

