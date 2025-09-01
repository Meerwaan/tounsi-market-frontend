import Link from "next/link";

export default function Navbar() {
    return (
        <header>
            <nav aria-label="Navigation principale">
                <Link href="/">Tounsi-Market</Link>
                {/* TODO: liens Produits / Promotions / À propos / Contact */}
                {/* TODO: icônes recherche / panier */}
            </nav>
        </header>
    );
}
