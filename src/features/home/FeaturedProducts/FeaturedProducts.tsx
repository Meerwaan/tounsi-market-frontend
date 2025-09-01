import styles from "./FeaturedProducts.module.scss";
import Container from "@/components/layout/Container/Container";
import Link from "next/link";
import products from "@/mocks/products.json";

type Product = {
    id: string;
    name: string;
    slug: string;
    priceCents: number;
    currency: string;
    images: string[];
};

export default function FeaturedProducts() {
    const items = (products as Product[]).slice(0, 4); // ⚡ seulement les 4 premiers

    return (
        <section className={styles.featured}>
            <Container>
                <h2 className={styles.title}>Produits phares</h2>
                <div className={styles.grid}>
                    {items.map((p) => (
                        <article key={p.id} className={styles.card}>
                            <Link href={`/products/${p.slug}`} className={styles.thumb}>
                                <img src={p.images[0]} alt={p.name} />
                            </Link>
                            <div className={styles.info}>
                                <h3 className={styles.name}>{p.name}</h3>
                                <p className={styles.price}>
                                    {(p.priceCents / 100).toFixed(2)} €
                                </p>
                                <button className={styles.cta}>Ajouter au panier</button>
                            </div>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );
}
