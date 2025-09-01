import "../styles/globals.scss";

export const metadata = {
    title: "Tounsi-Market",
    description: "Le goût de la Tunisie, livré chez vous",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" suppressHydrationWarning>
        <body>{children}</body>
        </html>
    );
}
