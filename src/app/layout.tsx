import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/data/site";
import { ScrollToTop } from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: `${site.brand.name} 채용 | 운동의 가치를 전하는 팀`,
  description: site.hero.subtitle,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="antialiased">
      <body>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
