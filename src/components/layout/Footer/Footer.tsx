import styles from "./Footer.module.scss";
import Container from "../Container/Container";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.grid}>
                    <div>
                        <h4 className={styles.title}>Tounsi-Market</h4>
                        <p className={styles.muted}>Le goût de la Tunisie, livré chez vous.</p>
                    </div>

                    <nav className={styles.col} aria-label="Liens utiles">
                        <a href="/shipping">Livraison</a>
                        <a href="/faq">FAQ</a>
                        <a href="/terms">Mentions légales</a>
                    </nav>

                    <nav className={styles.col} aria-label="Réseaux sociaux">
                        <a href="#" rel="noreferrer">Instagram</a>
                        <a href="#" rel="noreferrer">Facebook</a>
                        <a href="#" rel="noreferrer">TikTok</a>
                    </nav>
                </div>

                <div className={styles.bottom}>
                    <small>© {new Date().getFullYear()} Tounsi-Market — Tous droits réservés.</small>
                </div>
            </Container>
        </footer>
    );
}
