import { render, screen } from '@testing-library/react';
import SelectedProduct from '../../src/components/selectedProduct';
import * as Context from '../../src/context/appContext';
import { AppStore } from '../../src/context/appStore';
import { Currency } from '../../src/models/currency';
import { Price } from '../../src/models/price';
import * as LocalizedPrice from '../../src/services/useLocalizedPrice';

describe('Selected product component tests', () => {
    let useRouter: jest.SpyInstance;
    let useLocalizedPrice: jest.SpyInstance;

    beforeEach(() => {
        useRouter = jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({ locale: 'en-US' });
        useLocalizedPrice = jest.spyOn(LocalizedPrice, 'default');
    });

    afterEach(() => {
        useRouter.mockReset()
        useLocalizedPrice.mockReset();
    });

    it('renders and removed on click', () => {
        // Arrange
        const id = 12;
        const name = 'super cool product';
        const price: Price[] = [{
            locale: 'en-US',
            amount: 400,
            currency: Currency.USD
        }];
        const amount = 4;

        const useContext = jest.spyOn(Context, 'useAppContext');
        const removeFromCart = jest.fn((_id?: number) => { });

        const store: AppStore = {
            cart: {
                items: [],
                total: 30
            },
            addToCart: jest.fn(),
            removeFromCart: removeFromCart
        };
        useContext.mockReturnValue(store);
        useLocalizedPrice.mockReturnValue(price);

        // Act
        render(<SelectedProduct id={id} name={name} price={price} amount={amount}></SelectedProduct>);
        screen.getByText('Remove').click();

        // Assert
        expect(removeFromCart.mock.calls.length).toBe(1);
    });
});