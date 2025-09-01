type Props = {
    params: { slug: string };
};

export default function ProductPage({ params }: Props) {
    return (
        <section style={{ padding: "2rem" }}>
            <h1>Produit : {params.slug}</h1>
            <p>Page dynamique générée à partir du slug.</p>
        </section>
    );
}
