type Params = { slug: string };

export default async function ProductPage({
                                              params,
                                          }: {
    params: Promise<Params>;
}) {
    const { slug } = await params;

    return (
        <section style={{ padding: "2rem" }}>
            <h1>Produit : {slug}</h1>
            <p>Page dynamique générée à partir du slug.</p>
        </section>
    );
}
