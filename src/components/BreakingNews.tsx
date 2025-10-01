"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetcher } from "@/lib/fetcher";
import { NewsItem } from "@/lib/types";

export default function BreakingNews() {
  const [breakingNews, setBreakingNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBreakingNews = async () => {
      try {
        const data = await fetcher("/data/data.json");
        const allNews = Array.isArray(data) ? data : [];

        // Sort by date (most recent first) and take top 5
        const sortedNews = allNews
          .sort(
            (a, b) =>
              new Date(b.Insert_Date).getTime() -
              new Date(a.Insert_Date).getTime()
          )
          .slice(0, 5);

        setBreakingNews(sortedNews);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load breaking news:", error);
        setLoading(false);
      }
    };
    loadBreakingNews();
  }, []);

  if (loading || breakingNews.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breaking News Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider">
              ಬ್ರೇಕಿಂಗ್ ನ್ಯೂಸ್
            </h2>
            <div className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span
                className="w-2 h-2 bg-white rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></span>
              <span
                className="w-2 h-2 bg-white rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></span>
            </div>
          </div>
          <p className="text-orange-100 text-lg">
            ಇತ್ತೀಚಿನ ಮುಖ್ಯ ಸುದ್ದಿಗಳು ಮತ್ತು ನವೀಕರಣಗಳು
          </p>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {breakingNews.map((news, index) => (
            <Link
              key={news.News_Id}
              href={`/news/${news.Slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={news.Image}
                  alt={news.News_Title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-orange-600 text-white text-xs font-bold rounded-full shadow-lg">
                    {news.Categrory_Name}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
                  {news.News_Title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {news.News_Content.substring(0, 100)}...
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-medium">{news.News_Source}</span>
                  <span>
                    {new Date(news.Insert_Date).toLocaleDateString("kn-IN", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
