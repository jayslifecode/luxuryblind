"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/language-context";
import { Eyebrow } from "@/components/ui/eyebrow";
import { KoreanBadge } from "@/components/ui/korean-badge";
import { PriceDisplay } from "@/components/ui/price-display";
import TiltCard from "@/components/ui/tilt-card";
import ImageWithSkeleton from "@/components/ui/image-with-skeleton";
import { ArrowRight } from "lucide-react";
import products from "@/data/product.json";

export default function HomeScreenFeatured() {
  const { t } = useLanguage();
  const featured = products.slice(0, 3);

  return (
    <section className="py-20 sm:py-28 bg-lb-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <Eyebrow className="mb-3 text-lb-text-md">{t.featured.eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-lb-text">
              {t.featured.heading}
            </h2>
          </div>
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="/products"
              className="font-sans text-sm text-lb-gold hover:text-lb-gold-lt transition-colors shrink-0 font-semibold inline-flex items-center gap-2 group"
            >
              {t.featured.viewAll}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 100 }}
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
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="transition-transform duration-700 group-hover:scale-110"
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
                      <motion.h3
                        className="font-display text-xl font-light text-lb-text group-hover:text-lb-gold transition-colors duration-300"
                      >
                        {product.title}
                      </motion.h3>
                      <p className="font-sans text-xs text-lb-text-md leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-baseline gap-1.5 pt-2">
                        <span className="font-sans text-xs text-lb-text-md">{t.featured.from}</span>
                        <PriceDisplay amount={product.pricePerSqm} size="sm" />
                        <span className="font-sans text-xs text-lb-text-md">/ {t.featured.perSqm}</span>
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
