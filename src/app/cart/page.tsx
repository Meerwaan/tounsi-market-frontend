"use client";

import type { ChangeEvent } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container/Container";
import styles from "./CartPage.module.scss";
import { useCart } from "@/features/cart/CartContext";
import { formatCurrency } from "@/lib/format";

const SHIPPING_THRESHOLD_CENTS = 6000; // 60€
const SHIPPING_COST_CENTS = 490; // 4,90€

export default function CartPage() {
    const {
        items,
        currency,
        subtotalCents,
        totalQuantity,
        increment,
        decrement,
        updateQuantity,
        removeItem,
        clear,
    } = useCart();

    const shippingCents = subtotalCents === 0
        ? 0
        : subtotalCents >= SHIPPING_THRESHOLD_CENTS
            ? 0
            : SHIPPING_COST_CENTS;
    const totalCents = subtotalCents + shippingCents;
    const missingForFreeShipping = Math.max(0, SHIPPING_THRESHOLD_CENTS - subtotalCents);

    const handleProceedToCheckout = () => {
        // Placeholder pour le futur tunnel de paiement
        console.log("Passage au paiement avec", { items, totalCents });
        alert("Merci ! Le tunnel de paiement arrive très bientôt.");
    };

    return (
        <Container>
            <section className={styles.cart}>
                <header className={styles.header}>
                    <div className={styles.headerTop}>
                        <h1>Mon panier</h1>
                        {items.length > 0 && (
                            <button type="button" className={styles.clearButton} onClick={clear}>
                                Vider le panier
                            </button>
                        )}
                    </div>
                    <p>
                        {items.length === 0
                            ? "Vous n\u2019avez pas encore ajouté de délicieuses spécialités tunisiennes."
                            : `${totalQuantity} article${totalQuantity > 1 ? "s" : ""} avant le paiement.`}
                    </p>
                </header>

                {items.length === 0 ? (
                    <div className={styles.empty}>
                        <p>Votre panier est vide pour l’instant.</p>
                        <Link href="/products">Explorer les produits</Link>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        <div className={styles.list}>
                            {items.map(item => {
                                const lineTotalCents = item.priceCents * item.quantity;

                                const onQuantityInput = (event: ChangeEvent<HTMLInputElement>) => {
                                    const value = Number.parseInt(event.target.value, 10);
                                    if (Number.isNaN(value)) {
                                        updateQuantity(item.id, 1);
                                        return;
                                    }
                                    const safeValue = Math.min(99, Math.max(1, value));
                                    updateQuantity(item.id, safeValue);
                                };

                                return (
                                    <article key={item.id} className={styles.item}>
                                        <div className={styles.itemImage}>
                                            <img src={item.image ?? "/images/placeholder.png"} alt={item.name} />
                                        </div>
                                        <div className={styles.itemBody}>
                                            <div className={styles.itemHeader}>
                                                <h2 className={styles.itemTitle}>{item.name}</h2>
                                                <button
                                                    type="button"
                                                    className={styles.removeButton}
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    Retirer
                                                </button>
                                            </div>
                                            <span className={styles.price}>
                                                {formatCurrency(item.priceCents, item.currency)}
                                            </span>
                                            <div className={styles.controls}>
                                                <div className={styles.quantity}>
                                                    <button
                                                        type="button"
                                                        className={styles.quantityButton}
                                                        onClick={() => decrement(item.id)}
                                                        aria-label={`Diminuer la quantité de ${item.name}`}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        −
                                                    </button>
                                                    <input
                                                        className={styles.quantityInput}
                                                        type="number"
                                                        min={1}
                                                        max={99}
                                                        value={item.quantity}
                                                        onChange={onQuantityInput}
                                                        aria-label={`Quantité de ${item.name}`}
                                                    />
                                                    <button
                                                        type="button"
                                                        className={styles.quantityButton}
                                                        onClick={() => increment(item.id)}
                                                        aria-label={`Augmenter la quantité de ${item.name}`}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <span className={styles.lineTotal}>
                                                    {formatCurrency(lineTotalCents, item.currency)}
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                        <aside className={styles.summary}>
                            <div className={styles.summaryRow}>
                                <span>Sous-total</span>
                                <span>{formatCurrency(subtotalCents, currency)}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Livraison estimée</span>
                                <span>
                                    {shippingCents === 0
                                        ? subtotalCents === 0
                                            ? formatCurrency(0, currency)
                                            : "Offerte"
                                        : formatCurrency(shippingCents, currency)}
                                </span>
                            </div>
                            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                                <span>Total</span>
                                <span>{formatCurrency(totalCents, currency)}</span>
                            </div>
                            {missingForFreeShipping > 0 && (
                                <p className={styles.notice}>
                                    Plus que {formatCurrency(missingForFreeShipping, currency)} pour profiter de la
                                    livraison offerte !
                                </p>
                            )}
                            <button
                                type="button"
                                className={styles.checkoutButton}
                                onClick={handleProceedToCheckout}
                            >
                                Passer au paiement
                            </button>
                            <p className={styles.notice}>
                                Paiement 100% sécurisé, produits emballés avec soin depuis la Tunisie.
                            </p>
                        </aside>
                    </div>
                )}
            </section>
        </Container>
    );
}
