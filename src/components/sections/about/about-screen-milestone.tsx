"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function AboutMilestonesSection() {
    const milestones = [
        {
            year: "2005",
            title: "Компани Байгуулагдсан",
            description: "Жижиг гэр бүлийн бизнес болж эхэлсэн бөгөөд орон сууцны цонхны хөшигнүүдэд анхаарлаа хандуулсан.",
        },
        {
            year: "2010",
            title: "Худалдааны Хэлтэс Нээгдсэн",
            description: "Оффис, зочид буудал, рестораны худалдааны төслүүдийг багтаасан үйлчилгээгээ өргөжүүлсэн.",
        },
        {
            year: "2015",
            title: "Ухаантай Гэрийн Холболт",
            description: "Ухаантай гэрийн системтэй нийцтэй мотортой болон автоматжуулсан шийдлүүдийг нэвтрүүлсэн.",
        },
        {
            year: "2020",
            title: "Тогтвортой Байдлын Санаачлага",
            description: "Байгальд ээлтэй материал болон эрчим хүчний хэмнэлттэй цонхны хөшигний сонголтуудад тууштай ажилласан.",
        },
        {
            year: "2023",
            title: "Үндэсний Тэлэлт",
            description: "Өсөн нэмэгдэж буй үйлчлүүлэгчдийн бааздаа илүү сайн үйлчлэхийн тулд улс даяар шинэ үзэсгэлэнгийн танхимууд нээсэн.",
        },
    ];

    return (
        <section className="py-16 bg-muted/50 dark:bg-muted/10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-primary dark:text-foreground mb-4">
                        Бидний Аялал
                    </h2>
                    <p className="text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
                        Даруухан эхлэлээс салбарын тэргүүлэгч болтлоо, эдгээр тэмдэглүүрүүд бидний компанийн
                        өсөлт, хувьслыг тодорхойлсон.
                    </p>
                </div>

                <ScrollArea className="h-96 w-full max-w-3xl mx-auto rounded-md border p-4">
                    <div className="pr-4">
                        {milestones.map((milestone, index) => (
                            <div key={milestone.year} className="mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="bg-accent/10 text-accent font-semibold px-3 py-1 rounded">
                                        {milestone.year}
                                    </div>
                                    <h3 className="text-xl font-semibold text-primary dark:text-foreground">{milestone.title}</h3>
                                </div>
                                <div className="ml-16 mt-2">
                                    <p className="text-muted-foreground">{milestone.description}</p>
                                </div>
                                {index < milestones.length - 1 && <Separator className="my-4 ml-16" />}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </section>
    );
}