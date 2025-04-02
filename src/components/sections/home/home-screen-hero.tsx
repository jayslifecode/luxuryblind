"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HomeScreenHero() {
    return (
        <section className="relative h-96 md:h-screen max-h-[800px] overflow-hidden">
            <div className="absolute inset-0 bg-black/50 z-10">
                <Image
                    fill
                    src="/hero-background.jpeg"
                    alt="Тансаг хөшигтэй үзэсгэлэнтэй цонх"
                    className="w-full h-full object-cover mix-blend-overlay"
                />
            </div>
            <div className="container mx-auto px-4 relative h-full z-11 flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Дээд Зэргийн Цонхны Хөшигээр Орон Зайгаа Өөрчлөөрэй
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-8">
                        Захиалгат хөшиг болон сүүдрэвчээр гэр эсвэл бизнесээ дээшлүүлж, үйл ажиллагаа,
                        хувийн байдал, загварыг төгс тэнцвэржүүлээрэй.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                            Үнэгүй Зөвлөгөө Авах
                        </Button>
                        <Button size="lg" variant="outline" className="bg-background/20 text-white backdrop-blur-sm hover:bg-background/30">
                            Манай Бүтээгдэхүүнийг Харах
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}