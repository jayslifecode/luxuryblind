"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactInfoSection() {
    const contactInfo = [
        {
            icon: <Phone className="w-6 h-6 text-accent" />,
            title: "Утас",
            details: "(555) 123-4567",
            subDetails: "Даваа-Баасан, 9:00-17:00",
        },
        {
            icon: <Mail className="w-6 h-6 text-accent" />,
            title: "И-мэйл",
            details: "info@luxuryblinds.com",
            subDetails: "Бид 24 цагийн дотор хариу өгнө",
        },
        {
            icon: <MapPin className="w-6 h-6 text-accent" />,
            title: "Манай үзэсгэлэнгийн танхим",
            details: "123 Дизайн Дүүрэг, 100-р өрөө",
            subDetails: "Метрополис, NY 10001",
        },
        {
            icon: <Clock className="w-6 h-6 text-accent" />,
            title: "Ажлын цаг",
            details: "Даваа-Баасан: 9:00-17:00",
            subDetails: "Бямба: 10:00-16:00, Ням: Амарна",
        },
    ];

    return (
        <section className="py-16 bg-white dark:bg-background">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactInfo.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="bg-accent/10 p-3 rounded-full">{item.icon}</div>
                                    <CardTitle>{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-primary dark:text-foreground font-medium">{item.details}</p>
                                    <p className="text-muted-foreground text-sm">{item.subDetails}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
