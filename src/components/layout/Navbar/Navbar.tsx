"use client";

import Link from "next/link";
import styles from "./Navbar.module.scss";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
    { href: "/", label: "Accueil" },
    { href: "/products", label: "Produits" },
    { href: "/promotions", label: "Promotions" },
    { href: "/about", label: "À propos" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    // Empêche le scroll de la page quand le menu mobile est ouvert
    useEffect(() => {
        if (open) document.body.classList.add("no-scroll");
        else document.body.classList.remove("no-scroll");
        return () => document.body.classList.remove("no-scroll");
    }, [open]);

    return (
        <header className={styles.navbar}>
            <div className={styles.inner}>
                <Link href="/" className={styles.logo} aria-label="Tounsi-Market, retour à l’accueil">
                    <span className={styles.logo__left}>Tounsi</span>
                    <span className={styles.logo__dash}>-</span>
                    <span className={styles.logo__right}>Market</span>
                </Link>

                {/* Desktop */}
                <nav className={styles.nav} aria-label="Navigation principale">
                    {links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className={`${styles.link} ${pathname === l.href ? styles["link--active"] : ""}`}
                        >
                            {l.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className={styles.actions}>
                    <Link className={styles.icon} href="/search" aria-label="Rechercher">🔍</Link>
                    <Link className={styles.icon} href="/cart" aria-label="Panier">🛒</Link>
                    <button
                        className={styles.burger}
                        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        onClick={() => setOpen(v => !v)}
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* Mobile overlay */}
            <div
                id="mobile-menu"
                className={`${styles.mobile} ${open ? styles["mobile--open"] : ""}`}
                role="dialog"
                aria-modal="true"
            >
                {links.map((l) => (
                    <Link
                        key={l.href}
                        href={l.href}
                        className={`${styles.mobileLink} ${pathname === l.href ? styles["mobileLink--active"] : ""}`}
                        onClick={() => setOpen(false)}
                    >
                        {l.label}
                    </Link>
                ))}
                <div className={styles.mobileActions}>
                    <Link href="/search" onClick={() => setOpen(false)}>Rechercher</Link>
                    <Link href="/cart" onClick={() => setOpen(false)}>Panier</Link>
                </div>
            </div>
        </header>
    );
}
