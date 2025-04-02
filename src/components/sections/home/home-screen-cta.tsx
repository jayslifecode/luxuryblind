"use client";

import { Button } from "@/components/ui/button";

export default function HomeScreenCta() {
    return (
        <section className="py-16 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Таны Орон Зайг Өөрчлөхөд Бэлэн Үү?
                    </h2>
                    <p className="text-xl mb-8 text-primary-foreground/90">
                        Өнөөдөр бидэнтэй холбогдож, үнэгүй зөвлөгөө болон үнийн санал аваарай. Манай
                        мэргэжилтнүүд танд хамгийн тохиромжтой цонхны хөшигний шийдлийг олоход туслахад
                        бэлэн байна.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-background text-primary hover:bg-background/90">
                            Одоо Холбоо Барих
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-black hover:bg-background/10">
                            Бүтээгдэхүүнийг Харах
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}