'use client';

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useThemeStore } from "@/lib/store/theme-store";
import { useEffect } from "react";

export default function ThemeToggleButton() {
    const { isDark, toggleDark } = useThemeStore();

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    return (
        <Button
            variant="icon"
            onClick={toggleDark}
            className="fixed bottom-4 right-4 z-100"
        >
            {isDark ? (
                <Icon icon="line-md:moon" width="32" height="32" />
            ) : (
                <Icon icon="line-md:sun-rising-loop" width="32" height="32" />
            )}
        </Button>
    );
}