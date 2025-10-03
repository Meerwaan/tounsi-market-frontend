"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { Product } from "@/services/products.service";

type CartItem = {
    id: string;
    name: string;
    priceCents: number;
    currency: string;
    image?: string;
    quantity: number;
};

type CartState = {
    items: CartItem[];
};

type Action =
    | { type: "INITIALIZE"; payload: CartItem[] }
    | { type: "ADD_ITEM"; payload: CartItem }
    | { type: "REMOVE_ITEM"; payload: { id: string } }
    | { type: "INCREMENT"; payload: { id: string } }
    | { type: "DECREMENT"; payload: { id: string } }
    | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
    | { type: "CLEAR" };

type CartContextValue = {
    items: CartItem[];
    currency: string;
    subtotalCents: number;
    totalQuantity: number;
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (id: string) => void;
    increment: (id: string) => void;
    decrement: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clear: () => void;
};

const STORAGE_KEY = "tounsi-market-cart";

const CartContext = createContext<CartContextValue | undefined>(undefined);

function reducer(state: CartState, action: Action): CartState {
    switch (action.type) {
        case "INITIALIZE":
            return { items: action.payload };
        case "ADD_ITEM": {
            const existing = state.items.find(item => item.id === action.payload.id);
            if (!existing) {
                return { items: [...state.items, action.payload] };
            }

            return {
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item,
                ),
            };
        }
        case "REMOVE_ITEM":
            return { items: state.items.filter(item => item.id !== action.payload.id) };
        case "INCREMENT":
            return {
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                ),
            };
        case "DECREMENT":
            return {
                items: state.items
                    .map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                            : item,
                    ),
            };
        case "UPDATE_QUANTITY":
            return {
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: Math.max(1, action.payload.quantity) }
                        : item,
                ),
            };
        case "CLEAR":
            return { items: [] };
        default:
            return state;
    }
}

const initialState: CartState = { items: [] };

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const stored = window.localStorage.getItem(STORAGE_KEY);
            if (!stored) return;
            const parsed = JSON.parse(stored) as CartItem[];
            if (Array.isArray(parsed)) {
                dispatch({ type: "INITIALIZE", payload: parsed });
            }
        } catch (error) {
            console.error("CartProvider: impossible de lire le panier depuis le stockage", error);
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
        } catch (error) {
            console.error("CartProvider: impossible d'enregistrer le panier", error);
        }
    }, [state.items]);

    const value = useMemo<CartContextValue>(() => {
        const subtotalCents = state.items.reduce(
            (total, item) => total + item.priceCents * item.quantity,
            0,
        );
        const totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
        const currency = state.items[0]?.currency ?? "EUR";

        return {
            items: state.items,
            currency,
            subtotalCents,
            totalQuantity,
            addItem: (product, quantity = 1) => {
                dispatch({
                    type: "ADD_ITEM",
                    payload: {
                        id: product.id,
                        name: product.name,
                        priceCents: product.priceCents,
                        currency: product.currency,
                        image: product.images?.[0],
                        quantity,
                    },
                });
            },
            removeItem: (id: string) => dispatch({ type: "REMOVE_ITEM", payload: { id } }),
            increment: (id: string) => dispatch({ type: "INCREMENT", payload: { id } }),
            decrement: (id: string) => dispatch({ type: "DECREMENT", payload: { id } }),
            updateQuantity: (id: string, quantity: number) =>
                dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } }),
            clear: () => dispatch({ type: "CLEAR" }),
        };
    }, [state.items]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart doit être utilisé dans un CartProvider");
    }
    return context;
}

export type { CartItem };
