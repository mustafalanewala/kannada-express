import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "KannadaExpress",
  description:
    "KannadaExpress is your go-to source for the latest news and updates in the tech world. Stay informed with our comprehensive coverage of technology trends, product launches, and industry insights.",
  keywords:
    "technology, news, tech trends, product launches, industry insights",
  authors: [{ name: "KannadaExpress Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-50">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
