"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AboutTeamSection() {
    const teamMembers = [
        {
            name: "Давид Андерсон",
            position: "Үүсгэн байгуулагч & Гүйцэтгэх захирал",
            bio: "Цонхны бүрээсний салбарт 20 гаруй жилийн туршлагатай Давид Luxury Blinds-ийг үүсгэн байгуулж, орон сууц болон арилжааны хэрэглэгчдэд зориулсан өндөр зэрэглэлийн шийдлүүдийг санал болгох зорилготой.",
            image: "/api/placeholder/300/300",
        },
        {
            name: "Женнифер Мартинез",
            position: "Дизайны захирал",
            bio: "Женнифер 15 жилийн дотоод засал чимэглэлийн туршлагатай бөгөөд үйлчлүүлэгчдэд гоо үзэмж болон ажиллагааны төгс тэнцвэрийг олоход тусалдаг.",
            image: "/api/placeholder/300/300",
        },
        {
            name: "Роберт Томпсон",
            position: "Суулгалтын менежер",
            bio: "Сертификаттай суулгагчдын багийг удирдаж, Роберт бүх төслийг өндөр стандартын дагуу чанартай, нарийн хийж гүйцэтгэдэг.",
            image: "/api/placeholder/300/300",
        },
        {
            name: "Лиза Ван",
            position: "Хэрэглэгчийн харилцаа",
            bio: "Лиза үйлчлүүлэгчдэд өндөр түвшний үйлчилгээ үзүүлж, 98%-ийн сэтгэл ханамжийн түвшинтэй байхад гол үүрэг гүйцэтгэдэг бөгөөд байнгын харилцаа холбоог бий болгодог.",
            image: "/api/placeholder/300/300",
        },
    ];

    return (
        <section className="py-16 bg-white dark:bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-primary dark:text-foreground mb-4">
                        Манай Баг
                    </h2>
                    <p className="text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
                        Манай багийн гишүүд олон жилийн туршлагатай бөгөөд дизайн, суулгалт, хэрэглэгчийн
                        үйлчилгээний чиглэлээр хамгийн сайн үр дүнг гаргахын төлөө ажилладаг.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full overflow-hidden">
                                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                                <CardHeader>
                                    <CardTitle>{member.name}</CardTitle>
                                    <CardDescription className="text-accent">{member.position}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{member.bio}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
