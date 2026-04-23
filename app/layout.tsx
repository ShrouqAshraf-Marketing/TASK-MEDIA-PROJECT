import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({ subsets: ["latin", "arabic"] });

import { LanguageProvider } from "@/components/LanguageContext";
import { Providers } from "@/components/Providers";
import { ToastProvider } from "@/components/ToastContext";
import ChatBot from "@/components/ChatBot";
import FloatingNav from "@/components/FloatingNav";

export const metadata: Metadata = {
  title: "تاسك ميديا | مستقبل التسويق الاستراتيجي",
  description: "البيئة الرائدة لنخبة المواهب التسويقية. تعاقد مع محترفين لتوسيع نطاق أعمالك.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className={`${cairo.className} antialiased selection:bg-accent/30 selection:text-white overflow-x-hidden`}>
        <Providers>
          <LanguageProvider>
            <ToastProvider>
              {children}
              <ChatBot />
              <FloatingNav />
            </ToastProvider>
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
