import { Price } from "./price";

export interface ProductInCart {
    id: number,
    name: string,
    price: Price[],
    amount: number
}