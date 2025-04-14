import Link from "next/link";
import Image from "next/image";
import products from "@/data/product.json";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProductListGrid() {
    return (
        <div className="container mx-auto px-4 py-16 bg-background dark:bg-background">
            <h1 className="text-3xl font-bold text-foreground dark:text-foreground mb-6 text-center">
                Манай тансаг хөшигний цуглуулга
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                        <Card className="border border-border rounded-lg overflow-hidden hover:bg-muted dark:hover:bg-muted transition h-full">
                            <CardContent className="p-0 flex flex-col h-full">
                                <div className="relative w-full h-84">
                                    <Image
                                        src={product.images[0] || "/fallback.jpg"}
                                        alt={`${product.title} зураг`}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 840px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        priority={false}
                                    />
                                </div>

                                <Separator className="my-4" />

                                <div className="p-4 flex flex-col flex-grow">
                                    <h2 className="text-xl font-semibold text-foreground dark:text-foreground mb-1">
                                        {product.title}
                                    </h2>

                                    <ul className="text-muted-foreground dark:text-muted-foreground text-sm list-disc list-inside mb-2">
                                        {product.features.slice(0, 2).map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>

                                    <p className="text-muted-foreground dark:text-muted-foreground text-sm line-clamp-2">
                                        {product.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
