import styles from "./CategoriesStrip.module.scss";
import Container from "@/components/layout/Container/Container";
import Link from "next/link";
import categories from "@/mocks/categories.json";

type Category = { id: string; name: string; slug: string };

export default function CategoriesStrip() {
    const items = categories as Category[];

    return (
        <section className={styles.strip}>
            <Container>
                <div className={styles.grid}>
                    {items.slice(0, 4).map((c) => (
                        <Link key={c.id} href={`/products?category=${c.slug}`} className={styles.card}>
                            <div className={styles.thumb} aria-hidden />
                            <div className={styles.label}>{c.name}</div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
