"use client";

import products from "@/data/product.json";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { use } from "react";
import { KoreanBadge } from "@/components/ui/korean-badge";
import { ProductConfigurator } from "../product-configurator";

interface ProductDetailScreenProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailScreen({ params }: ProductDetailScreenProps) {
  const resolvedParams = use(params);
  const product = products.find((p) => p.id === resolvedParams.id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-lb-cream py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-lb-lborder">
              <Image
                src={product.images[selectedImage] || "/fallback.jpg"}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-sm overflow-hidden border transition-colors min-w-[44px] min-h-[44px] ${
                      selectedImage === i ? "border-lb-gold" : "border-lb-lborder"
                    }`}
                  >
                    <Image src={img} alt={`thumbnail ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details + Configurator */}
          <div className="space-y-8">
            <div className="space-y-4">
              <KoreanBadge />
              <h1 className="font-display text-3xl sm:text-4xl font-light text-lb-text">
                {product.title}
              </h1>
              <p className="font-sans text-sm text-lb-text-md leading-relaxed">{product.description}</p>

              {product.features && product.features.length > 0 && (
                <ul className="space-y-1.5">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 font-sans text-sm text-lb-text-md">
                      <span className="text-lb-gold mt-0.5">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex gap-6 pt-2 border-t border-lb-lborder">
                {product.material && (
                  <div>
                    <p className="font-sans text-[10px] text-lb-text-md tracking-widest uppercase mb-1">Материал</p>
                    <p className="font-sans text-sm text-lb-text font-medium">{product.material}</p>
                  </div>
                )}
                {"weight" in product && product.weight && (
                  <div>
                    <p className="font-sans text-[10px] text-lb-text-md tracking-widest uppercase mb-1">Жин</p>
                    <p className="font-sans text-sm text-lb-text font-medium">{product.weight}</p>
                  </div>
                )}
              </div>
            </div>

            <ProductConfigurator
              productId={product.id}
              productTitle={product.title}
              pricePerSqm={product.pricePerSqm}
            />
          </div>
        </div>
      </div>
    </main>
  );
}