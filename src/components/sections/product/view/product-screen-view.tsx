import ProductListGrid from "../product-grid";

export default function ProductListView() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <ProductListGrid />
        </div>
    );
}