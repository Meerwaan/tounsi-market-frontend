"use client";

import Link from "next/link";
import styles from "./Navbar.module.scss";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

    return (
        <header className={styles.navbar}>
            <div className={styles.inner}>
                {/* Logo typographique simple */}
                <Link href="/" className={styles.logo} aria-label="Tounsi-Market, retour à l’accueil">
                    <span className={styles.logo__left}>Tounsi</span>
                    <span className={styles.logo__dash}>-</span>
                    <span className={styles.logo__right}>Market</span>
                </Link>

                {/* Liens desktop */}
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

                {/* Actions à droite */}
                <div className={styles.actions}>
                    <Link className={styles.icon} href="/search" aria-label="Rechercher">🔍</Link>
                    <Link className={styles.icon} href="/cart" aria-label="Panier">🛒</Link>

                    {/* Burger mobile */}
                    <button
                        className={styles.burger}
                        aria-label="Ouvrir le menu"
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* Menu mobile */}
            <div className={`${styles.mobile} ${open ? styles["mobile--open"] : ""}`}>
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
                    <Link href="/search">Rechercher</Link>
                    <Link href="/cart">Panier</Link>
                </div>
            </div>
        </header>
    );
}
