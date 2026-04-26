"use client";

import Link from "next/link";
import { motion } from "motion/react";
import products from "@/data/product.json";
import { useLanguage } from "@/lib/context/language-context";
import { KoreanBadge } from "@/components/ui/korean-badge";
import { PriceDisplay } from "@/components/ui/price-display";
import { Eyebrow } from "@/components/ui/eyebrow";
import TiltCard from "@/components/ui/tilt-card";
import ImageWithSkeleton from "@/components/ui/image-with-skeleton";
import { ArrowRight } from "lucide-react";

export default function ProductListGrid() {
  const { t } = useLanguage();

  return (
    <section className="py-20 sm:py-28 bg-lb-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <Eyebrow className="mb-3 text-lb-text-md">{t.featured.eyebrow}</Eyebrow>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-lb-text">
            {t.featured.heading}
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08, type: "spring", stiffness: 100 }}
            >
              <TiltCard tiltAmount={8} className="h-full">
                <motion.div
                  className="group bg-lb-white rounded-sm overflow-hidden border border-lb-lborder shadow-sm hover:shadow-xl transition-shadow duration-500 h-full"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link href={`/products/${product.id}`} className="block h-full">
                    <div className="relative aspect-[4/5] overflow-hidden bg-lb-cream">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                      <ImageWithSkeleton
                        src={product.images[0] || "/fallback.jpg"}
                        alt={product.title}
                        fill
                        className="transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <motion.div
                        className="absolute top-3 left-3 z-10"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                      >
                        <KoreanBadge />
                      </motion.div>
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                      >
                        <div className="bg-lb-gold/95 backdrop-blur-sm text-lb-bg py-3 px-4 rounded-t-lg flex items-center justify-between">
                          <span className="font-sans text-xs font-semibold tracking-wider uppercase">
                            {t.featured.configure}
                          </span>
                          <ArrowRight size={16} />
                        </div>
                      </motion.div>
                    </div>
                    <div className="p-5 space-y-3">
                      <motion.h2
                        className="font-display text-xl font-light text-lb-text group-hover:text-lb-gold transition-colors duration-300"
                      >
                        {product.title}
                      </motion.h2>
                      <p className="font-sans text-xs text-lb-text-md line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                      <div className="flex items-baseline gap-1.5 font-sans text-xs text-lb-text-md pt-2">
                        <span>{t.featured.from}</span>
                        <PriceDisplay amount={product.pricePerSqm} size="sm" />
                        <span>/ {t.featured.perSqm}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
