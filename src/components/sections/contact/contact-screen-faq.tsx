"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

export default function ContactFaqSection() {
    const faqs = [
        {
            question: "Суулгалт хэдэн цагийн турш үргэлжлэх вэ?",
            answer: "Оршин суугчдын суулгалтууд ихэвчлэн 1-3 цагийн дотор дуусна, хэрэв цонх олон бол хугацаа урт болно. Арилжааны төслүүдийн хугацаа төсөл болон агуулгаас хамаарна.",
        },
        {
            question: "Таны бүтээгдэхүүнд баталгаа олгох уу?",
            answer: "Тиймээ, манай бүх бүтээгдэхүүн 5 жилийн баталгаа, суулгалтанд 2 жилийн баталгатай. Мөн урт хугацааны баталгаа санал болгодог.",
        },
        {
            question: "Шийдвэр гаргахын өмнө дээжийг үзэж болох уу?",
            answer: "Мэдээж! Бид үнэгүй гэртээ зөвлөх үйлчилгээ үзүүлдэг бөгөөд манай дизайнерууд дээжүүдийг шууд танд авчирдаг. Түүнчлэн та манай үзэсгэлэнгийн танхимд очиж бүх бүтээгдэхүүнийг үзэж болно.",
        },
        {
            question: "Та санхүүжилтийн сонголт санал болгодог уу?",
            answer: "Тиймээ, бид хэд хэдэн санхүүжилтийн төлөвлөгөөг баталгаажуулсан зээлийн шаардлагатай, тэр дундаа 0% хүүтэй санал болгодог. Дэлгэрэнгүй мэдээллийг биднээс авна уу.",
        },
        {
            question: "Цонхны бүрээсээ хэрхэн арчлах вэ?",
            answer: "Арчлах заавар нь материал бүрт өөр өөр байдаг. Бид суулгалтын дараа бүх хэрэглэгчдэд арчилгааны дэлгэрэнгүй заавар өгдөг бөгөөд бидний хэрэглэгчийн үйлчилгээний баг танд туслахад бэлэн байна.",
        },
    ];

    return (
        <section className="py-16 bg-white dark:bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-primary dark:text-foreground mb-4">
                        Түгээмэл асуудаг асуултууд
                    </h2>
                    <p className="text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
                        Манай хамгийн түгээмэл асуултуудад хариултуудыг түргэн олоорой. Хэрэв та хүссэн зүйлээ олохгүй бол бидэнтэй шууд холбоо барина уу.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Collapsible className="w-full mb-4">
                                <Card>
                                    <CardHeader className="p-4 cursor-pointer">
                                        <CollapsibleTrigger asChild>
                                            <div className="flex justify-between items-center w-full">
                                                <CardTitle className="text-lg">{faq.question}</CardTitle>
                                                <span>+</span>
                                            </div>
                                        </CollapsibleTrigger>
                                    </CardHeader>
                                    <CollapsibleContent>
                                        <CardContent className="pt-0 pb-4 px-4">
                                            <Separator className="mb-4" />
                                            <p className="text-muted-foreground">{faq.answer}</p>
                                        </CardContent>
                                    </CollapsibleContent>
                                </Card>
                            </Collapsible>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Card className="max-w-3xl mx-auto bg-muted/30 dark:bg-muted/20">
                        <CardContent className="flex flex-col sm:flex-row items-center gap-4 p-6">
                            <div className="bg-accent/10 p-3 rounded-full">
                                <AlertCircle className="w-8 h-8 text-accent" />
                            </div>
                            <div className="text-center sm:text-left">
                                <h3 className="text-lg font-semibold text-primary dark:text-foreground mb-1">
                                    Танд асуулт байвал?
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    Манай хэрэглэгчийн үйлчилгээний баг таны асуултад хариулж туслахад бэлэн байна.
                                </p>
                            </div>
                            <Button className="sm:ml-auto whitespace-nowrap">
                                Дэмжлэг авах
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};
