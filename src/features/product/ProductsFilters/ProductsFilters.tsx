"use client";

import styles from "./ProductsFilters.module.scss";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Category = { id: string; name: string; slug: string };

export default function ProductsFilters({
                                            categories,
                                        }: {
    categories: Category[];
}) {
    const router = useRouter();
    const pathname = usePathname();
    const sp = useSearchParams();

    const currentCategory = sp.get("category") ?? "";
    const initialQ = sp.get("q") ?? "";

    const [q, setQ] = useState(initialQ);

    // Debounce: on attend 300ms avant de pousser la nouvelle URL
    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(sp.toString());
            if (q.trim()) params.set("q", q.trim());
            else params.delete("q");
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        }, 300);
        return () => clearTimeout(timeout);
        // sp, pathname changent quand on clique une pill => on recalcule à partir des nouvelles valeurs
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [q]);

    // Si on change de catégorie (via un <Link>), on garde l'input en phase avec l'URL
    useEffect(() => {
        setQ(initialQ);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialQ, currentCategory]);

    const pillHref = (slug?: string) => {
        const params = new URLSearchParams(sp.toString());
        if (slug) params.set("category", slug);
        else params.delete("category");
        // on garde 'q' tel quel
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className={styles.filters}>
            {/* Pills catégories */}
            <div className={styles.pills}>
                <Link
                    href={pillHref()}
                    className={!currentCategory ? styles.active : ""}
                    aria-current={!currentCategory ? "page" : undefined}
                >
                    Toutes
                </Link>

                {categories.map((c) => (
                    <Link
                        key={c.id}
                        href={pillHref(c.slug)}
                        className={currentCategory === c.slug ? styles.active : ""}
                        aria-current={currentCategory === c.slug ? "page" : undefined}
                    >
                        {c.name}
                    </Link>
                ))}
            </div>

            {/* Recherche temps réel */}
            <div className={styles.search}>
                <input
                    type="search"
                    placeholder="Rechercher un produit…"
                    aria-label="Rechercher"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                />
                {/* bouton supprimé : plus nécessaire */}
            </div>
        </div>
    );
}
