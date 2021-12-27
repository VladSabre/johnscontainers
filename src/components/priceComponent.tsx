import React from 'react';
import { useRouter } from "next/router";
import { Currency } from "../models/currency";
import { Price } from "../models/price";
import useLocalizedPrice from "../services/getLocalizedPrice";

const PriceComponent = (props: { price: Price[] }): JSX.Element => {
    const localizedPrice = useLocalizedPrice(useRouter().locale, props.price);
    const currencyIcon = getCurrencyIcon(localizedPrice.currency);

    return (<div>{`${localizedPrice.amount} ${currencyIcon}`}</div>);
};

const getCurrencyIcon = (currency: Currency): string => {
    switch (currency) {
        case Currency.USD:
            return '$';
        case Currency.EUR:
            return '€';
    }
};

export default PriceComponent;