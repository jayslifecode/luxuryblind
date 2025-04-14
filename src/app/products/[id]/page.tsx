import ProductDetailScreen from "@/components/sections/product/view/product-detail-screen";

export default function ProductPage({ params }: { params: { id: string } }) {
    const paramsPromise = Promise.resolve(params);
    return <ProductDetailScreen params={paramsPromise} />;
}