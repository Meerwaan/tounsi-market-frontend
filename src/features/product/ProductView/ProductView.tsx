import styles from "./ProductView.module.scss";
import Link from "next/link";
import type { Product } from "@/services/products.service";

type Props = { product: Product };

export default function ProductView({ product }: Props) {
    const img = product.images?.[0] || "/images/placeholder.png";

    return (
        <section className={styles.product}>
            {/* Fil d'ariane simple */}
            <nav className={styles.breadcrumb} aria-label="Fil d'ariane">
                <Link href="/products">Produits</Link> / <span>{product.name}</span>
            </nav>

            <div className={styles.grid}>
                <div className={styles.gallery}>
                    <div className={styles.image}>
                        <img src={img} alt={product.name} />
                    </div>
                    {/* Plus tard : miniatures si plusieurs images */}
                </div>

                <div className={styles.buybox}>
                    <h1 className={styles.title}>{product.name}</h1>
                    <p className={styles.price}>{(product.priceCents / 100).toFixed(2)} €</p>
                    {product.description && (
                        <p className={styles.desc}>{product.description}</p>
                    )}
                    <div className={styles.actions}>
                        <button className={styles.cta} aria-label="Ajouter au panier">
                            Ajouter au panier
                        </button>
                        <Link href="/cart" className={styles.secondary}>
                            Voir le panier
                        </Link>
                    </div>
                    <p className={styles.meta}>Disponibilité : {product.stock ?? 0} en stock</p>
                </div>
            </div>
        </section>
    );
}
