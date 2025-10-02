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
import Ad from "@/components/Ad";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm py-4">
            <Link
              href="/"
              className="text-orange-600 hover:text-orange-800 transition-colors duration-300 font-medium flex items-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <Link
              href={`/category/${slugifyCategory(newsItem.Categrory_Name)}`}
              className="text-orange-600 hover:text-orange-800 transition-colors duration-300"
            >
              {newsItem.Categrory_Name}
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-gray-600 truncate">
              {newsItem.News_Title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="px-3 py-1 bg-orange-600 text-white text-sm font-medium rounded-full">
              {newsItem.Categrory_Name}
            </span>
            <span className="text-gray-500 text-sm">
              {formatDate(newsItem.Insert_Date)}
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {newsItem.News_Title}
          </h1>

          <div className="flex items-center justify-between border-b border-gray-200 pb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold text-sm">
                  {newsItem.News_Source.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {newsItem.News_Source}
                </p>
                <p className="text-sm text-gray-600">News Source</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: newsItem.News_Title,
                      text: newsItem.News_Content.substring(0, 100) + "...",
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }
                }}
                className="p-2 text-gray-400 hover:text-orange-600 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <div className="relative h-64 lg:h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={newsItem.Image}
              alt={newsItem.News_Title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-orange-100">
            <div className="text-gray-800 leading-relaxed text-lg">
              {newsItem.News_Content.split("।").map((sentence, index) => (
                <p key={index} className="mb-4">
                  {sentence.trim()}
                  {sentence.trim() && "।"}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Article Ad Slot */}
        <div className="mb-12">
          <Ad slot="article-middle" format="rectangle" />
        </div>

        {/* Article Footer */}
        <footer className="border-t border-gray-200 pt-8 mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Published on</span>
              <span className="font-semibold text-gray-900">
                {formatDate(newsItem.Insert_Date)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Category:</span>
              <Link
                href={`/category/${slugifyCategory(newsItem.Categrory_Name)}`}
                className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors duration-200"
              >
                {newsItem.Categrory_Name}
              </Link>
            </div>
          </div>
        </footer>

        {/* Related Articles */}
        {relatedNews.length > 0 && (
          <section className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedNews.map((article) => (
                <Link
                  key={article.News_Id}
                  href={`/news/${article.Slug}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={article.Image}
                      alt={article.News_Title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 bg-orange-600 text-white text-xs font-medium rounded">
                        {article.Categrory_Name}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
                      {article.News_Title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {article.News_Content}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{article.News_Source}</span>
                      <span>{formatDate(article.Insert_Date)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
