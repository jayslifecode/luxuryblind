"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ContactFormMapSection() {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitted(true);
    };

    return (
        <section className="py-16 bg-muted/50 dark:bg-muted/10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold text-primary dark:text-foreground mb-6">
                            Бидэнтэй Холбогдох
                        </h2>
                        <p className="text-muted-foreground dark:text-muted-foreground mb-8">
                            Асуулт байна уу эсвэл зөвлөгөө товлох гэж байна уу? Доорх маягтыг бөглөж
                            илгээвэл манай мэргэжилтнүүдийн нэг тантай аль болох хурдан холбогдоно.
                        </p>

                        <Card>
                            <CardContent className="pt-6">
                                {formSubmitted ? (
                                    <div className="flex flex-col items-center text-center py-8">
                                        <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-4 rounded-full mb-4">
                                            <MessageSquare className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-semibold text-primary dark:text-foreground mb-2">
                                            Баярлалаа!
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Таны мессеж амжилттай илгээгдлээ. Манай төлөөлөгчдийн нэг тантай
                                            24 цагийн дотор холбогдоно.
                                        </p>
                                        <Button
                                            variant="outline"
                                            className="mt-6"
                                            onClick={() => setFormSubmitted(false)}
                                        >
                                            Өөр Мессеж Илгээх
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">Нэр</Label>
                                                <Input id="firstName" placeholder="Таны нэрийг оруулна уу" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Овог</Label>
                                                <Input id="lastName" placeholder="Таны овгийг оруулна уу" required />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="email">И-мэйл</Label>
                                                <Input id="email" type="email" placeholder="Таны и-мэйлийг оруулна уу" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Утас</Label>
                                                <Input id="phone" placeholder="Таны утасны дугаарыг оруулна уу" required />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Сэдэв</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Сэдэв сонгоно уу" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="consultation">Зөвлөгөө Хүсэх</SelectItem>
                                                    <SelectItem value="quote">Үнийн Санал Авах</SelectItem>
                                                    <SelectItem value="support">Харилцагчийн Тусламж</SelectItem>
                                                    <SelectItem value="other">Бусад</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message">Мессеж</Label>
                                            <textarea
                                                id="message"
                                                className="w-full min-h-32 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                placeholder="Бид танд хэрхэн тусалж болохыг хэлнэ үү..."
                                                required
                                            ></textarea>
                                        </div>

                                        <Button type="submit" className="w-full">Мессеж Илгээх</Button>

                                        <p className="text-xs text-muted-foreground text-center">
                                            Энэ маягтыг илгээснээр та манай нууцлалын бодлого болон үйлчилгээний нөхцөлийг зөвшөөрч байна.
                                        </p>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col h-full"
                    >
                        <h2 className="text-3xl font-bold text-primary dark:text-foreground mb-6">
                            Манай Үзэсгэлэнгийн Танхимд Зочлоорой
                        </h2>
                        <p className="text-muted-foreground dark:text-muted-foreground mb-6">
                            Манай бүтээгдэхүүнийг биечлэн үзэж, дизайны мэргэжилтнүүдтэй ярилцаарай. Манай
                            үзэсгэлэнгийн танхимд олон төрлийн хөшиг, сүүдрэвч, автоматжуулалтын шийдэл бий.
                        </p>

                        <div className="flex-1 rounded-xl overflow-hidden border shadow-md">
                            <div className="bg-muted w-full h-full min-h-96 flex flex-col items-center justify-center p-8">
                                <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
                                <p className="text-primary dark:text-foreground font-medium text-center">
                                    123 Дизайны Дүүрэг, 100-р Хаалга<br />
                                    Метрополис, NY 10001
                                </p>
                                <p className="text-sm text-muted-foreground mt-2 text-center">
                                    (Газрын зураг энд харагдана)
                                </p>
                                <Button variant="outline" className="mt-6">
                                    Замын Зураг Авах
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}