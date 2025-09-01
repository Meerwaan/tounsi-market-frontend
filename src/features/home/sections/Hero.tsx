import styles from "./Hero.module.scss";
import Container from "@/components/layout/Container/Container";
import Link from "next/link";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <Container>
                <div className={styles.grid}>
                    <div className={styles.content}>
                        <h1 className={styles.title}>
                            Le goût de la Tunisie, livré chez vous
                        </h1>
                        <p className={styles.subtitle}>
                            Boissons, gâteaux, épices et produits difficiles à trouver en France.
                        </p>
                        <Link href="/products" className={styles.cta}>
                            Découvrir la boutique
                        </Link>
                    </div>

                    {/* Visuel à droite (placeholder pour l’instant) */}
                    <div className={styles.visual} aria-hidden>
                        {/* Tu remplaceras par une image produit plus tard */}
                    </div>
                </div>
            </Container>
        </section>
    );
}
