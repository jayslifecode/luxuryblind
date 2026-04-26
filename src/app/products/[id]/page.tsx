import ProductDetailScreen from "@/components/sections/product/view/product-detail-screen";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    return <ProductDetailScreen params={params} />;
}