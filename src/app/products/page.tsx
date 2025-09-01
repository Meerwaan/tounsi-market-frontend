import Container from "@/components/layout/Container/Container";
import ProductCard from "@/features/product/ProductCard/ProductCard";
import { listProducts, type Product } from "@/services/products.service";
import categoriesData from "@/mocks/categories.json";
import styles from "./ProductsPage.module.scss";
import ProductsFilters from "@/features/product/ProductsFilters/ProductsFilters";

type Category = { id: string; name: string; slug: string };
type SearchParams = { category?: string; q?: string };

export default async function ProductsPage({
                                               searchParams,
                                           }: {
    searchParams: Promise<SearchParams>;
}) {
    const { category, q } = await searchParams;
    const categories = categoriesData as Category[];
    const all = await listProducts();

    // filtre catégorie via slug
    const byCategory = category
        ? all.filter((p) => {
            const cat = categories.find((c) => c.slug === category);
            return cat ? p.categoryId === cat.id : true;
        })
        : all;

    // filtre recherche (nom contient q)
    const needle = (q ?? "").trim().toLowerCase();
    const filtered = needle
        ? byCategory.filter((p) => p.name.toLowerCase().includes(needle))
        : byCategory;

    return (
        <Container>
            <section className={styles.catalogue}>
                <h1 className={styles.title}>Catalogue</h1>

                {/* Filtres en client (mise à jour URL en temps réel) */}
                <ProductsFilters categories={categories} />

                {/* Grille */}
                <div className={styles.grid}>
                    {filtered.map((p: Product) => (
                        <ProductCard key={p.id} p={p} />
                    ))}
                </div>

                {filtered.length === 0 && (
                    <p className={styles.empty}>Aucun produit ne correspond à votre recherche.</p>
                )}
            </section>
        </Container>
    );
}
