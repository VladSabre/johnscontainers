import { render, screen } from '@testing-library/react'
import PriceComponent from '../../src/components/priceComponent'
import { Currency } from '../../src/models/currency'
import { Price } from '../../src/models/price'
import * as LocalizedPrice from '../../src/services/useLocalizedPrice';

describe('PriceComponent tests', () => {
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

    it('renders price', () => {
        // Arrange
        const price: Price[] = [{ locale: 'en-US', amount: 400, currency: Currency.USD }];
        useLocalizedPrice.mockReturnValue(price[0]);

        // Act
        render(<PriceComponent price={price} />)

        // Assert
        expect(screen.queryByText('400 $')).toBeInTheDocument();
    })
})