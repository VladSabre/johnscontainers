import { Currency } from '../models/currency';
import { HomePageInfo } from '../models/homePageInfo';
import { ProductResponse } from '../models/productResponse';
import { RegionalSettings } from '../models/regionalSettings';

export class StoreService {
    public getLocalizaion(locale: string): Map<string, string> {
        if (locale == 'en-US')
            return new Map<string, string>([
                ["label_add-to-cart", "Add to cart"],
                ["label_in-stock", "In stock"],
                ["label_out-of-stock", "Out of stock"],
            ]);
        else if (locale == 'de-DE')
            return new Map<string, string>([
                ["label_add-to-cart", "in den Warenkorb"],
                ["label_in-stock", "Vorrätig"],
                ["label_out-of-stock", "Ausverkauft"],
            ]);
        else
            throw Error('Unexpected locale');
    }

    public getProducts(): ProductResponse {
        return {
            metaTags: {
                title: "Integer bibendum",
                description: "Phasellus porta, ante sit amet accumsan tristique"
            },
            products: [
                {
                    id: 1,
                    name: "Vivamus magna",
                    image: "/container1.jpg",
                    isInStock: true,
                    price: [
                        {
                            locale: 'en-US',
                            amount: 1500,
                            currency: Currency.USD
                        },
                        {
                            locale: 'de-DE',
                            amount: 1200,
                            currency: Currency.EUR
                        }
                    ]
                },
                {
                    id: 2,
                    name: "Sed vitae",
                    image: "/container2.jpg",
                    isInStock: false,
                    price: [
                        {
                            locale: 'en-US',
                            amount: 4200,
                            currency: Currency.USD
                        },
                        {
                            locale: 'de-DE',
                            amount: 3500,
                            currency: Currency.EUR
                        }
                    ]
                }
            ]
        };
    }

    public getHomeText(locale: string | undefined): HomePageInfo {
        switch (locale) {
            case 'en-US':
                return { greetingText: 'Hello! Welcome to our', linkText: 'Store' };
            case 'de-DE':
                return { greetingText: 'Hallo! Willkommen in unserem', linkText: 'Shop' };
            default:
                throw new Error('unexpected locale');
        }
    }

    public getRegionalSettings(region: string): RegionalSettings {
        if (region === 'us')
            return {
                paymentMethods: ['ACH', 'Card', 'PayPal']
            };
        else if (region === 'de')
            return {
                paymentMethods: ['Card', 'PayPal']
            };
        else
            throw Error('Unexpected region');
    }
}