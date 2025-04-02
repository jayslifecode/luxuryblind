"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomeScreenBenefits() {
    const benefits = [
        {
            title: "Эрчим Хүчний Хэмнэлт",
            description: "Температурын хяналтын шийдлүүдээр таны төлбөрийг бууруулна",
            icon: <CheckCircle className="w-6 h-6 text-accent" />,
        },
        {
            title: "Гэрлийн Хяналт",
            description: "Байгалийн гэрэл, хувийн нууц, хэт ягаан туяаны хамгаалалтын төгс тэнцвэр",
            icon: <CheckCircle className="w-6 h-6 text-accent" />,
        },
        {
            title: "Дуу Шум Багасгалт",
            description: "Дууг шингээдэг даавуугаар илүү нам гүм орчин бий болгоно",
            icon: <CheckCircle className="w-6 h-6 text-accent" />,
        },
        {
            title: "Ухаантай Холболт",
            description: "Ухаантай утсаар эсвэл дуут туслахаар хөшгөө удирдана",
            icon: <CheckCircle className="w-6 h-6 text-accent" />,
        },
    ];

    return (
        <section className="py-16 bg-background dark:bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-foreground mb-4">
                        Манай Дээд Зэргийн Шийдлүүдийн Давуу Талууд
                    </h2>
                    <p className="text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
                        Манай захиалгат цонхны хөшигнүүд нь зөвхөн гоо зүйн талаасаа бус юм. Эдгээр нь таны
                        өдөр тутмын амьдрал болон ажлын орчныг сайжруулах практик давуу талуудыг санал болгодог.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full">
                                <CardHeader>
                                    <div className="mb-2">{benefit.icon}</div>
                                    <CardTitle>{benefit.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{benefit.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}