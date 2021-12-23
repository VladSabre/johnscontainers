import { Price } from "./price";

export interface ProductCardModel {
    id: number,
    name: string,
    image: string,
    isInStock: boolean,
    price: Price[]
}