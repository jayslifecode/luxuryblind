"use client";

import "./globals.css";
import Header from "@/components/sections/header/views/header-view";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <html lang="en">
      <body className="bg-background min-h-screen">
        <Header />
        {children}
        <Button
          variant="icon"
          onClick={() => setIsDark(!isDark)}
          className="fixed bottom-4 right-4"
        >
          {isDark ? <Icon icon="line-md:moon" width="32" height="32" /> : <Icon icon="line-md:sun-rising-loop" width="32" height="32" />}
        </Button>
      </body>
    </html>
  );
}
