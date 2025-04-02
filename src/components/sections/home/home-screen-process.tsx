"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomeScreenProcess() {
    const processSteps = [
        {
            number: "01",
            title: "Үнэгүй зөвлөгөө",
            description: "Таны хэрэгцээ, хэв маяг, төсөвт тохирсон шийдлийг ярилцана."
        },
        {
            number: "02",
            title: "Мэргэжлийн хэмжилт",
            description: "Манай мэргэжилтнүүд таны цонхны хэмжээг нарийн тогтооно."
        },
        {
            number: "03",
            title: "Захиалгат сонголт",
            description: "Өнгө, материал, үйлдлийн өргөн сонголтоос сонгоорой."
        },
        {
            number: "04",
            title: "Мэргэжлийн суурилуулалт",
            description: "Манай сертификаттай мэргэжилтнүүд төгс суурилуулалт хийж гүйцэтгэнэ."
        }
    ];

    return (
        <section className="py-16 bg-background dark:bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-foreground mb-4">
                        Манай энгийн үйл явц
                    </h2>
                    <p className="text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
                        Бидний үйл явц нь хялбар, стрессгүй байхыг зорьсон бөгөөд танд эхний зөвлөгөөнөөс эцсийн суурилуулалт хүртэлх алхамуудыг чиглүүлнэ.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {processSteps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="relative h-full">
                                <div className="text-5xl font-bold text-accent/20 absolute top-3 right-4">
                                    {step.number}
                                </div>
                                <CardHeader>
                                    <CardTitle className="mt-4">{step.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                        Өөрийн зөвлөгөөг товлох
                    </Button>
                </div>
            </div>
        </section>
    );
}
