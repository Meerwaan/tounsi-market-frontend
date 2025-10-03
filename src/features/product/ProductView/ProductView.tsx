"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import styles from "./ProductView.module.scss";
import Link from "next/link";
import type { Product } from "@/services/products.service";
import { useCart } from "@/features/cart/CartContext";

type Props = { product: Product };

export default function ProductView({ product }: Props) {
    const img = product.images?.[0] || "/images/placeholder.png";
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const increase = () => setQuantity(q => Math.min(99, q + 1));
    const decrease = () => setQuantity(q => Math.max(1, q - 1));

    const onQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(event.target.value, 10);
        if (Number.isNaN(value)) {
            setQuantity(1);
            return;
        }
        setQuantity(Math.min(99, Math.max(1, value)));
    };

    const handleAddToCart = () => {
        addItem(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

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
                    <div className={styles.quantity}> 
                        <span>Quantité</span>
                        <div className={styles.quantityControl}>
                            <button type="button" onClick={decrease} aria-label="Diminuer la quantité">−</button>
                            <input
                                type="number"
                                min={1}
                                max={99}
                                value={quantity}
                                onChange={onQuantityChange}
                                aria-label="Quantité"
                            />
                            <button type="button" onClick={increase} aria-label="Augmenter la quantité">+</button>
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.cta}
                            aria-label="Ajouter au panier"
                            onClick={handleAddToCart}
                        >
                            Ajouter au panier
                        </button>
                        <Link href="/cart" className={styles.secondary}>
                            Voir le panier
                        </Link>
                    </div>
                    {added && <p className={styles.feedback}>Ajouté au panier ✅</p>}
                    <p className={styles.meta}>Disponibilité : {product.stock ?? 0} en stock</p>
                </div>
            </div>
        </section>
    );
}
