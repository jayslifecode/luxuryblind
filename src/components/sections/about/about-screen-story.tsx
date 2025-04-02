"use client";

import { motion } from "framer-motion";

export default function AboutOurStorySection() {
    return (
        <section className="py-16 bg-white dark:bg-background">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold text-primary dark:text-foreground mb-6">
                            Манай Түүх
                        </h2>
                        <p className="text-muted-foreground dark:text-muted-foreground mb-4">
                            2005 онд үүсгэн байгуулагдсан Luxury Blinds нь орон зайн гоо үзэмж болон ажиллагааг
                            сайжруулах өндөр чанартай цонхны бүрээсийг санал болгох энгийн боловч хүчирхэг
                            алсын хараатайгаар эхэлсэн.
                        </p>
                        <p className="text-muted-foreground dark:text-muted-foreground mb-4">
                            Анх гэр бүлийн жижиг бизнес байсан бол одоо өндөр зэрэглэлийн орон сууц,
                            арилжааны хэрэглэгчдэд зориулсан цонхны шилдэг шийдлүүдийг санал болгодог томоохон
                            компани болон өргөжсөн. Манай өсөлт нь чанар, инноваци, хэрэглэгчийн сэтгэл ханамжид
                            тавих тууштай хандлагад суурилсан.
                        </p>
                        <p className="text-muted-foreground dark:text-muted-foreground">
                            Өнөөдөр бид уламжлалт гар урлалыг орчин үеийн технологитой хослуулан,
                            гоо үзэмжтэй бөгөөд ажиллагаатай цонхны шийдлүүдийг бий болгох шинэ боломжуудыг
                            эрэлхийлсээр байна.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="rounded-xl overflow-hidden shadow-lg"
                    >
                        <img
                            src="/api/placeholder/600/400"
                            alt="Манай үзэсгэлэнгийн танхим"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
