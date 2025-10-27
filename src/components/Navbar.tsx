"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-50 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section with logo, sections, and menu */}
        <div className="flex justify-between md:grid md:grid-cols-3 items-center py-4">
          <div className="justify-self-start">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="ಸುದ್ದಿ ಲೋಗೋ"
                width={250}
                height={60}
                className="h-auto"
                priority
              />
            </Link>
          </div>

          <div className="justify-self-center hidden md:flex space-x-8">
            <Link
              href="/gallery"
              className={cn(
                "font-medium text-base whitespace-nowrap transition-colors duration-200",
                "text-black hover:text-orange-600"
              )}
            >
              ಗ್ಯಾಲರಿ
            </Link>
            <Link
              href="/video"
              className={cn(
                "font-medium text-base whitespace-nowrap transition-colors duration-200",
                "text-black hover:text-orange-600"
              )}
            >
              ವೀಡಿಯೊ
            </Link>
            <Link
              href="/blog"
              className={cn(
                "font-medium text-base whitespace-nowrap transition-colors duration-200",
                "text-black hover:text-orange-600"
              )}
            >
              ಬ್ಲಾಗ್
            </Link>
          </div>

          <div className="justify-self-end">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-black hover:text-orange-600"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="flex flex-col space-y-3 py-4 border-t border-orange-200">
            <div className="md:hidden">
              <Link
                href="/gallery"
                className="font-medium text-lg text-black hover:text-orange-600 transition-colors duration-200 py-2 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ಗ್ಯಾಲರಿ
              </Link>
              <Link
                href="/video"
                className="font-medium text-lg text-black hover:text-orange-600 transition-colors duration-200 py-2 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ವೀಡಿಯೊ
              </Link>
              <Link
                href="/blog"
                className="font-medium text-lg text-black hover:text-orange-600 transition-colors duration-200 py-2 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ಬ್ಲಾಗ್
              </Link>
            </div>

            <div className="border-t border-orange-200 pt-3 mt-3 space-y-3">
              <Link
                href="/about"
                className="font-medium text-lg text-black hover:text-orange-600 transition-colors duration-200 py-2 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ನಮ್ಮ ಬಗ್ಗೆ
              </Link>
              <Link
                href="/privacy"
                className="font-medium text-lg text-black hover:text-orange-600 transition-colors duration-200 py-2 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ಗೌಪ್ಯತಾ ನೀತಿ
              </Link>
              <Link
                href="/contact"
                className="font-medium text-lg text-black hover:text-orange-600 transition-colors duration-200 py-2 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ಸಂಪರ್ಕ
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
