import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "NewsGuardian - Fake News Detection",
  description: "Advanced AI-powered fake news detection and analysis platform. Detect fake news in files, links, and videos with multilingual support.",
  keywords: ["fake news", "news detection", "AI", "fact checking", "news analysis", "media verification"],
  authors: [{ name: "NewsGuardian Team" }],
  openGraph: {
    title: "NewsGuardian - Fake News Detection",
    description: "AI-powered fake news detection and analysis platform",
    url: "https://newsguardian.vercel.app",
    siteName: "NewsGuardian",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NewsGuardian - Fake News Detection",
    description: "AI-powered fake news detection and analysis platform",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white text-gray-900 font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
