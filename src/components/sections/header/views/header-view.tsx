"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/assets/icon";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { name: "Нүүр хуудас", path: "/" },
        { name: "Бүтээгдэхүүн", path: "/products" },
        { name: "Бидний тухай", path: "/about" },
        { name: "Холбоо барих", path: "/contact" }
    ];

    const isActive = (path: string) => {
        return pathname === path;
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-background dark:bg-primary text-primary dark:text-primary-foreground py-4 sticky top-0 z-10 border-b dark:border-border shadow-sm z-20"
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold">
                        <Logo />
                    </Link>

                    <nav className="hidden md:block">
                        <ul className="flex space-x-6">
                            {navItems.map((item) => (
                                <motion.li
                                    key={item.name}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                    className="font-thin"
                                >
                                    <Link
                                        href={item.path}
                                        className={`transition-colors ${isActive(item.path)
                                            ? 'text-accent font-thin'
                                            : 'hover:text-accent'}`}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </nav>

                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleMobileMenu}
                            className="p-2"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden bg-white dark:bg-primary border-t border-border"
                >
                    <nav className="container mx-auto px-4 py-4">
                        <ul className="space-y-4">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.path}
                                        className={`block transition-colors ${isActive(item.path)
                                            ? 'text-accent font-medium'
                                            : 'hover:text-accent'}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-4">
                                <Button className="w-full">Үнэгүй зөвлөх үйлчилгээ авах</Button>
                            </li>
                        </ul>
                    </nav>
                </motion.div>
            )}
        </motion.header>
    );
}
