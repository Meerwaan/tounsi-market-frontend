import styles from "./ProductCard.module.scss";
import Link from "next/link";
import type { Product } from "@/services/products.service";

export default function ProductCard({ p }: { p: Product }) {
    const img = p.images?.[0] || "/images/placeholder.png";
    return (
        <article className={styles.card}>
            <Link href={`/products/${p.slug}`} className={styles.thumb}>
                <img src={img} alt={p.name} />
            </Link>
            <div className={styles.info}>
                <h3 className={styles.name}>{p.name}</h3>
                <p className={styles.price}>{(p.priceCents / 100).toFixed(2)} €</p>
                <Link href={`/products/${p.slug}`} className={styles.cta}>
                    Voir le produit
                </Link>
            </div>
        </article>
    );
}
