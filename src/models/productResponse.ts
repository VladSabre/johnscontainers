import { ProductCardModel } from "./productCardModel";

export interface ProductResponse {
    metaTags: {
        title: string
    }
    products: ProductCardModel[]
}