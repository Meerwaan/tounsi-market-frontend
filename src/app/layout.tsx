// src/app/layout.tsx
import "../styles/globals.scss";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tounsi-Market",
    description: "Le goût de la Tunisie, livré chez vous",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" suppressHydrationWarning>
        <body suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
        </body>
        </html>
    );
}

