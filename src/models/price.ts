import { Currency } from "./currency";

export interface Price {
    locale: string,
    amount: number,
    currency: Currency
}