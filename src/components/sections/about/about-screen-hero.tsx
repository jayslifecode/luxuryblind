import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutScreenHero() {
    return (
        <section className="relative h-80 overflow-hidden">
            <div className="absolute inset-0 bg-black/60">
                <Image
                    src="/api/placeholder/1920/600"
                    alt="Манай багийн ажиллаж буй мөч"
                    className="w-full h-full object-cover mix-blend-overlay"
                    fill
                />
            </div>
            <div className="container mx-auto px-4 relative h-full flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Luxury Blinds-ийн тухай
                    </h1>
                    <p className="text-lg text-white/90">
                        Бид орон зайг гайхалтай хэв маяг, ажиллагаа, тогтвортой байдал бүхий цонхны бүрээсээр өөрчлөх зорилготой.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
