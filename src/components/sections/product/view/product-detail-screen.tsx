"use client";

import products from "@/data/product.json";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { use } from "react";

interface ProductDetailScreenProps {
    params: Promise<{ id: string }>;
}

interface Product {
    id: string;
    title: string;
    description: string;
    features?: string[];
    material?: string;
    dimensions?: {
        wide?: string;
        thickness?: string;
    };
    weight?: string;
    colorVariants?: { name: string; hex: string }[];
    images: string[];
}

export default function ProductDetailScreen({ params }: ProductDetailScreenProps) {
    const resolvedParams = use(params);
    const product = products.find((p) => p.id === resolvedParams.id) as Product | undefined;
    const [selectedImage, setSelectedImage] = useState(0);

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 md:py-16 bg-background dark:bg-background">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center">
                    <div className="relative w-full h-148 mb-4 flex justify-center">
                        <div className="relative h-full max-w-full">
                            <Image
                                src={product.images[selectedImage] || "/fallback.jpg"}
                                alt={product.title}
                                width={400}
                                height={600}
                                className="h-full object-contain"
                                style={{ maxHeight: "36rem" }}
                                priority
                            />
                        </div>
                    </div>
                    <ScrollArea className="w-full h-24">
                        <div className="flex gap-2 p-2 justify-center">
                            {product.images.map((image, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    className={`p-0 w-20 h-20 relative ${selectedImage === index ? "border-2 border-primary" : ""
                                        }`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <Image
                                        src={image}
                                        alt={`${product.title} thumbnail ${index + 1}`}
                                        fill
                                        className="object-cover rounded"
                                    />
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {/* Right - Details */}
                <div>
                    <h1 className="text-3xl font-bold text-foreground dark:text-foreground mb-4">
                        {product.title}
                    </h1>

                    <p className="text-muted-foreground dark:text-muted-foreground mb-4">
                        {product.description}
                    </p>

                    {product.features && product.features.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
                                Онцлог шинжүүд
                            </h2>
                            <ul className="list-disc list-inside text-muted-foreground dark:text-muted-foreground space-y-1">
                                {product.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {product.material && (
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
                                Материал
                            </h2>
                            <p className="text-muted-foreground dark:text-muted-foreground">
                                {product.material}
                            </p>
                        </div>
                    )}

                    {product.dimensions && (
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
                                Хэмжээ
                            </h2>
                            <ul className="text-muted-foreground dark:text-muted-foreground">
                                {product.dimensions.wide && <li>Өргөн: {product.dimensions.wide}</li>}
                                {product.dimensions.thickness && <li>Зузаан: {product.dimensions.thickness}</li>}
                            </ul>
                        </div>
                    )}

                    {product.weight && (
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
                                Жин
                            </h2>
                            <p className="text-muted-foreground dark:text-muted-foreground">
                                {product.weight}
                            </p>
                        </div>
                    )}

                    {product.colorVariants && product.colorVariants.length > 0 && (
                        <>
                            <h2 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
                                Color Variants
                            </h2>
                            <ul className="flex gap-4">
                                {product.colorVariants.map((color) => (
                                    <li key={color.name} className="flex items-center gap-2">
                                        <div
                                            className="w-6 h-6 rounded-full border border-border"
                                            style={{ backgroundColor: color.hex }}
                                        />
                                        <span className="text-foreground dark:text-foreground">
                                            {color.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}