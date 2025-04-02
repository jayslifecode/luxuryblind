import { motion } from "framer-motion";

export default function ContactScreenHero() {
    return (
        <section className="relative h-64 overflow-hidden">
            <div className="absolute inset-0 bg-black/60">
                <img
                    src="/api/placeholder/1920/400"
                    alt="Бидэнтэй холбогдох"
                    className="w-full h-full object-cover mix-blend-overlay"
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
                        Бидэнтэй холбогдох
                    </h1>
                    <p className="text-lg text-white/90">
                        Бид таны асуултуудад хариулахад бэлэн байна, мөн таны орон зайнд өөрчлөлт оруулахад туслахад таатай байна.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
