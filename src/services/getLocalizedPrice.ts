import { Price } from "../models/price";
import { defaultLocaleIfAbsent } from "./useLocalization";

export default function getLocalizedPrice(locale: string | undefined, price: Price[]): Price {
    return price.find(x => x.locale == defaultLocaleIfAbsent(locale)) || price[0];
}