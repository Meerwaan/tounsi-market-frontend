const formatterCache = new Map<string, Intl.NumberFormat>();

function getFormatter(currency: string) {
    if (!formatterCache.has(currency)) {
        formatterCache.set(
            currency,
            new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency,
                minimumFractionDigits: 2,
            }),
        );
    }

    return formatterCache.get(currency)!;
}

export function formatCurrency(amountCents: number, currency: string = "EUR") {
    const formatter = getFormatter(currency);
    return formatter.format(amountCents / 100);
}
