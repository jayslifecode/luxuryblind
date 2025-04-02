"use client";

import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function HomeScreenTestimonials() {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Гэрийн Эзэн",
            content: "Хөшиг болон суурилуулалтын үйлчилгээний чанар гайхалтай байсан. Багийнхан мэргэжлийн, үр дүнтэй ажиллаж, манай гэрийг цэвэрхэн үлдээсэн. Бид үр дүндээ маш их баяртай байна.",
        },
        {
            name: "Michael Rodriguez",
            role: "Оффисын Менежер",
            content: "Luxury Blinds-тай оффисын шинэчлэлд хамтран ажиллахад амар байсан. Автомат хөшигнүүд бидний эрчим хүчний зардлыг мэдэгдэхүйц бууруулж, ажилчдын тав тухыг сайжруулсан.",
        },
        {
            name: "Emily Chen",
            role: "Интерьер Дизайнер",
            content: "Интерьер дизайнерын хувьд би олон төрлийн нийлүүлэгчидтэй ажилласан ч Luxury Blinds нарийвчлалд анхаарал хандуулж, чанарт тууштай байдгаараа онцгой юм. Одоо тэд миний үйлчлүүлэгчдэд санал болгодог гол сонголт болсон.",
        },
    ];

    return (
        <section className="py-16 bg-muted/50 dark:bg-muted/10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-foreground mb-4">
                        Манай Үйлчлүүлэгчид Юуг Хэлж Байна Вэ
                    </h2>
                    <p className="text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
                        Зөвхөн бидний үгэнд бүү итгэ. Манай сэтгэл хангалуун үйлчлүүлэгчдийн бидний бүтээгдэхүүн,
                        үйлчилгээний талаарх туршлагыг сонсоорой.
                    </p>
                </div>

                <Carousel className="w-full max-w-4xl mx-auto">
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem key={index}>
                                <Card className="mx-4">
                                    <CardHeader>
                                        <div className="flex mb-4">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                                            ))}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground mb-6">
                                            &quot;{testimonial.content}&quot;
                                        </p>
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                                                <span className="text-accent font-bold">
                                                    {testimonial.name.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-primary dark:text-foreground">
                                                    {testimonial.name}
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {testimonial.role}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex justify-center mt-4 gap-2">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}