import { ProductInCart } from "./productInCart";

export interface Cart {
    total: number,
    items: ProductInCart[]
}