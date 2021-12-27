import { render, screen } from '@testing-library/react';
import ProductCard from '../../src/components/productCard';
import * as Context from '../../src/context/appContext';
import { AppStore } from '../../src/context/appStore';
import { Currency } from '../../src/models/currency';
import { Price } from '../../src/models/price';
import * as LocalizedPrice from '../../src/services/useLocalizedPrice';
import * as Localization from '../../src/services/useLocalization';
import { ProductCardModel } from '../../src/models/productCardModel';

describe('Product card component tests', () => {
    let useRouter: jest.SpyInstance;
    let useLocalizedPrice: jest.SpyInstance;
    let useLocalization: jest.SpyInstance;
    let addToCart: jest.Mock;

    beforeEach(() => {
        useRouter = jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({ locale: 'en-US' });
        useLocalizedPrice = jest.spyOn(LocalizedPrice, 'default');
        useLocalization = jest.spyOn(Localization, 'default');
        addToCart = jest.fn((_product: ProductCardModel) => { });

        const localization = new Map<string, string>([
            ['label_add-to-cart', 'Add to cart'],
            ['label_in-stock', 'In stock'],
            ['label_out-of-stock', 'Out of stock'],
        ]);

        const useContext = jest.spyOn(Context, 'useAppContext');

        const store: AppStore = {
            cart: {
                items: [],
                total: 30
            },
            addToCart: addToCart,
            removeFromCart: jest.fn()
        };

        const price: Price[] = [{
            locale: 'en-US',
            amount: 400,
            currency: Currency.USD
        }];

        useLocalization.mockReturnValue(localization);
        useContext.mockReturnValue(store);
        useLocalizedPrice.mockReturnValue(price);
    });

    afterEach(() => {
        useRouter.mockReset()
        useLocalizedPrice.mockReset();
        useLocalization.mockReset();
    });

    it('renders product card and adds to cart', () => {
        // Arrange
        const id = 12;
        const name = 'super cool product';
        const price: Price[] = [{
            locale: 'en-US',
            amount: 400,
            currency: Currency.USD
        }];

        // Act
        render(<ProductCard id={id} name={name} price={price} image='/nonExistingImage' isInStock={true}></ProductCard>);
        screen.getByText('Add to cart').click();

        // Assert
        expect(screen.getByText('In stock')).toBeInTheDocument();
        expect(addToCart.mock.calls.length).toBe(1);
    });

    it('renders product card not in stock', () => {
        // Arrange
        const id = 12;
        const name = 'super cool product';
        const price: Price[] = [{
            locale: 'en-US',
            amount: 400,
            currency: Currency.USD
        }];

        // Act
        render(<ProductCard id={id} name={name} price={price} image='/nonExistingImage' isInStock={false}></ProductCard>);

        // Assert
        expect(screen.getByText('Out of stock')).toBeInTheDocument();
        expect(screen.getByText('Add to cart')).toBeDisabled();
    });
});