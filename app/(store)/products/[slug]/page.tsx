import AddToBasketButton from "@/components/AddToBasketButton";
import { imageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

async function ProductPage({ params }: { params: { slug: string } }) {
    const { slug } = params; // No need to await params; it's already resolved
    console.log("Fetching product for slug:", slug);
    
    const product = await getProductBySlug(slug);
    
    if (!product) {
        console.log("Product not found");
        return notFound();
    }

    console.log("Product retrieved:", product);
    console.log("Product image:", product.image);
    
    const isOutOfStock = product.stock != null && product.stock <= 0;
    console.log("Is product out of stock:", isOutOfStock);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}>
                    {product.image && (
                        <Image
                            src={imageUrl(product.image).url()}
                            alt={product.name || "Product image"}
                            fill // Updated prop
                            className="object-contain transition-transform duration-300 hover:scale-105"
                        />
                    )}
                    {isOutOfStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white text-2xl font-bold">
                            <span>Out of Stock</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <div className="text-xl font-semibold mb-4">${product.price?.toFixed(2)}</div>
                        <div className="prose max-w-none mb-6">
                            {Array.isArray(product.description) && (
                                <PortableText value={product.description} />
                            )}
                        </div>

                        <div className="mt-6">
                            <AddToBasketButton product={product} disabled={isOutOfStock} />
                        </div> {/* Closing div for AddToBasketButton */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
