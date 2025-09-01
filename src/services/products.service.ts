import products from "@/mocks/products.json";

export type Product = {
    id: string;
    name: string;
    slug: string;
    priceCents: number;
    currency: string;
    images: string[];
    categoryId?: string;
    stock?: number;
    description?: string;
};

export async function listProducts(): Promise<Product[]> {
    return products as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    const items = products as Product[];
    return items.find(p => p.slug === slug) ?? null;
}
