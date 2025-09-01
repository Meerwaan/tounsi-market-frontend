// src/app/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/services/products.service";
import ProductView from "@/features/product/ProductView/ProductView";
import Container from "@/components/layout/Container/Container";

type Params = { slug: string };

export default async function ProductPage({
                                              params,
                                          }: {
    params: Promise<Params>;
}) {
    const { slug } = await params; // Next 15 : params asynchrone
    const product = await getProductBySlug(slug);

    if (!product) return notFound();

    return (
        <Container>
            <ProductView product={product} />
        </Container>
    );
}
