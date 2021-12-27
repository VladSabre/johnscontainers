import React, { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import { ProductCardModel } from "../models/productCardModel";
import { Cart } from "../models/cart";
import getLocalizedPrice from "../services/getLocalizedPrice";
import { AppContext } from "./appContext";

type Props = {
    children: ReactNode;
};

export function AppProvider({ children }: Props) {
    const defaultCart: Cart = {
        items: [],
        total: 0
    };

    const locale = useRouter().locale;
    const [Cart, setCart] = useState(defaultCart);

    const addToCart = (product: ProductCardModel): void => {
        const item = Cart.items.find(x => x.id === product.id);
        Cart.total += getLocalizedPrice(locale, product.price).amount;

        if (!item) {
            Cart.items.push({ id: product.id, name: product.name, price: product.price, amount: 1 });
        }
        else {
            item.amount++;
        }

        setCart({ ...Cart });
    };

    const removeFromCart = (id?: number): void => {
        if (id) {
            const removedItem = Cart.items.filter(x => x.id === id)[0];
            Cart.items = Cart.items.filter(x => x.id !== id);
            Cart.total -= getLocalizedPrice(locale, removedItem.price).amount * removedItem.amount;
        }
        else {
            Cart.items = [];
            Cart.total = 0;
        }

        setCart({ ...Cart });
    };

    const value = {
        cart: Cart,
        addToCart: addToCart,
        removeFromCart: removeFromCart
    };

    return (
        <>
            <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
        </>
    );
}