"use client";

import BreakingNews from "@/components/BreakingNews";
import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <BreakingNews />
    </div>
  );
}
