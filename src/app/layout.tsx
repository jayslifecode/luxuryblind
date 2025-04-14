import "./globals.css";
import Header from "@/components/sections/header/views/header-view";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background min-h-screen">
        <Header />
        {children}
        <ThemeToggleButton />
      </body>
    </html>
  );
}