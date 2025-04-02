"use client";

import { motion } from "framer-motion";
import { Award, Users, TrendingUp, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutCoreValuesSection() {
    const values = [
        {
            icon: <Award className="w-10 h-10 text-accent" />,
            title: "Чанар",
            description: "Бид материал болон ур хийцийг хэзээ ч бууруулдаггүй."
        },
        {
            icon: <Users className="w-10 h-10 text-accent" />,
            title: "Хэрэглэгч төвтэй байдал",
            description: "Таны сэтгэл ханамж бидний хамгийн тэргүүлэх зорилго юм."
        },
        {
            icon: <TrendingUp className="w-10 h-10 text-accent" />,
            title: "Инноваци",
            description: "Бид бүтээгдэхүүн, үйлчилгээгээ байнга хөгжүүлж байдаг."
        },
        {
            icon: <CheckCircle className="w-10 h-10 text-accent" />,
            title: "Шударга байдал",
            description: "Шударга бизнесийн зарчим, ил тод үнийн бодлого баримталдаг."
        },
    ];

    return (
        <section className="py-16 bg-muted/50 dark:bg-muted/10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-primary dark:text-foreground mb-4">
                        Манай Үнэт Зарчмууд
                    </h2>
                    <p className="text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
                        Эдгээр зарчмууд нь бидний бүтээгдэхүүн хөгжүүлэлт, хэрэглэгчийн үйлчилгээ зэрэг бүхий л үйл ажиллагааг чиглүүлдэг.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full text-center">
                                <CardHeader>
                                    <div className="flex justify-center mb-4">{value.icon}</div>
                                    <CardTitle>{value.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{value.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
