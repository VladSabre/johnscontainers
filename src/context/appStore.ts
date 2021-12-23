import { Cart } from "../models/cart";
import { ProductCardModel } from "../models/productCardModel";

export interface AppStore {
    cart: Cart,
    addToCart: (product: ProductCardModel) => void,
    removeFromCart: (id?: number) => void
}