"use client";

import { MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function HomeScreenFeatured() {
    const featuredProjects = [
        {
            title: "Корпорацийн Оффисын Шинэчлэл",
            location: "Төв Бизнесийн Дүүрэг",
            description: "20 давхар оффисын барилгад мотортой гулгадаг хөшигний бүрэн суурилуулалт",
            image: "/api/placeholder/600/400",
        },
        {
            title: "Тансаг Гэрийн Өөрчлөлт",
            location: "Хотын Захын Орон Сууцны Хаалга",
            description: "Унтлагын өрөө болон хүүхдийн өрөөнд харанхуйлагчтай захиалгат ромын хөшиг",
            image: "/api/placeholder/600/400",
        },
        {
            title: "Рестораны Уур Амьсгалын Сайжруулалт",
            location: "Далайн Хажуугийн Хоолны Дүүрэг",
            description: "Харагдацыг хадгалахын зэрэгцээ хувийн байдлыг хангасан гэрэл шүүдэг босоо хөшиг",
            image: "/api/placeholder/600/400",
        },
    ];

    return (
        <section className="py-16 bg-muted/50 dark:bg-muted/10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-foreground mb-4">
                        Онцлох Төслүүд
                    </h2>
                    <p className="text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
                        Манай сүүлийн үеийн суурилуулалтуудыг харж, цонхны хөшигний шийдлүүдийн чанар болон
                        олон талт байдлыг танилцаарай.
                    </p>
                </div>

                <Carousel className="w-full max-w-5xl mx-auto">
                    <CarouselContent>
                        {featuredProjects.map((project) => (
                            <CarouselItem key={project.title}>
                                <Card className="overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-64 object-cover"
                                    />
                                    <CardHeader>
                                        <div className="flex items-center mb-1">
                                            <MapPin className="w-4 h-4 text-accent mr-1" />
                                            <span className="text-sm text-muted-foreground">
                                                {project.location}
                                            </span>
                                        </div>
                                        <CardTitle>{project.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">
                                            {project.description}
                                        </p>
                                    </CardContent>
                                    <CardFooter>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="link" className="flex items-center text-accent p-0">
                                                    Төслийг Харах <ChevronRight className="w-4 h-4 ml-1" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>{project.title}</DialogTitle>
                                                    <DialogDescription>{project.location}</DialogDescription>
                                                </DialogHeader>
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-64 object-cover rounded-md my-4"
                                                />
                                                <p className="text-muted-foreground">{project.description}</p>
                                                <p className="mt-4">
                                                    Энэхүү төсөл нь бидний чанар болон нарийвчлалд анхаарал хандуулдагыг
                                                    харуулдаг. Үйлчлүүлэгч орон зайн гоо зүй болон үйл ажиллагааг сайжруулах
                                                    шийдэл хайж байсан бөгөөд манай баг тэдний хүлээлтээс давсан захиалгат
                                                    шийдлийг хүргэсэн.
                                                </p>
                                            </DialogContent>
                                        </Dialog>
                                    </CardFooter>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex justify-center mt-4 gap-2">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>

                <div className="text-center mt-12">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Бүх Төслүүдийг Харах
                    </Button>
                </div>
            </div>
        </section>
    );
}