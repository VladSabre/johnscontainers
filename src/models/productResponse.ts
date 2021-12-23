import { ProductCardModel } from "./productCardModel";

export interface ProductResponse {
    metaTags: {
        title: string,
        description: string
    }
    products: ProductCardModel[]
}