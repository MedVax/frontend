"use client";

import categoryApi from "@/apis/category-api";
import LoadingContent from "@/common/loading-content";
import { Shell } from "@/components/ui";
import { Skeleton, Typography } from "@mui/material";
import { Suspense } from "react";


const page = () => {
    const getCategories = categoryApi.useGetCategoriesQuery({
        params: {
            includeSubcategories: false,
            hierarchy: false,
        },
    });

    return (
        <Shell component="section" className="my-20">
            <Typography variant="h5" className="font-semibold! text-center">Category</Typography>
            <div className="flex items-center justify-center">
                <Typography variant="body1" color="text.secondary" className="text-center max-w-[400px] mx-auto">
                    Kindly scroll through, filter and get exactly what was prescribed to you
                    be a medical practitioner
                </Typography>
            </div>



            <LoadingContent loading={getCategories.isLoading} error={getCategories.error} renderLoading={() => <CategoryLoading />}>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-20">
                    {getCategories.data?.data.map((category) => (
                        <div key={category.id} className="bg-white p-4 flex flex-col items-center gap-2">
                            <div className="flex items-center gap-2 rounded-full overflow-hidden p-2 bg-gray-100 w-fit">
                                <img
                                    src={category.image || ""}
                                    alt={category.name}
                                    className="object-cover w-[100px] h-[100px] rounded-full"
                                />
                            </div>
                            <Typography variant="body1" className="text-center font-semibold!">{category.name}</Typography>
                        </div>
                    ))}
                </div>
            </LoadingContent>
        </Shell>
    );
};

const CategoryLoading = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full mt-20">
            {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="bg-white p-4 flex flex-col items-center gap-2">
                    <Skeleton variant="circular" width={100} height={100} />
                    <Skeleton variant="text" width="100%" height={20} />
                </div>
            ))}
        </div>
    );
};

export default page;
