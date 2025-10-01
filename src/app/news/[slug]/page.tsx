"use client";

import { use } from "react";
import useSWR from "swr";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { fetcher } from "@/lib/fetcher";
import type { NewsItem } from "@/lib/types";
import { formatDate, slugifyCategory } from "@/lib/news-utils";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const { data, error, isLoading } = useSWR<NewsItem[]>(
    "/data/data.json",
    fetcher
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading News
          </h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  const newsItem = data.find((item) => item.Slug === slug);

  if (!newsItem) {
    notFound();
  }

  const relatedNews = data
    .filter(
      (item) =>
        item.Categrory_Name === newsItem.Categrory_Name &&
        item.News_Id !== newsItem.News_Id
    )
    .slice(0, 4);

  return <div className="min-h-screen bg-gray-50"></div>;
}
