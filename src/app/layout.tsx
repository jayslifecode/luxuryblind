import { Playfair_Display, DM_Sans, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/header/views/header-view";
import Footer from "@/components/sections/footer/footer";
import { LanguageProvider } from "@/lib/context/language-context";
import { OrderProvider } from "@/lib/context/order-context";
import PageTransition from "@/components/ui/page-transition";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn" className={`${playfair.variable} ${dmSans.variable} ${bodoni.variable}`}>
      <body className="bg-lb-bg text-lb-ivory min-h-screen">
        <LanguageProvider>
          <OrderProvider>
            <Header />
            <div className="pt-16">
              <PageTransition>
                {children}
              </PageTransition>
            </div>
            <Footer />
          </OrderProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
