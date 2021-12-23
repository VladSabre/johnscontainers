import { render, screen } from '@testing-library/react'
import sinon from 'sinon'
import PriceComponent from '../../src/components/priceComponent'
import { Currency } from '../../src/models/currency'
import { Price } from '../../src/models/price'

describe('PriceComponent tests', () => {
    let useLocalizedPrice: sinon.SinonStub;
    const useRouter = jest.spyOn(require('next/router'), 'useRouter')

    beforeEach(() => {
        useLocalizedPrice = sinon.stub(useLocalizedPrice.prototype, 'useLocalizedPrice');
    });

    afterEach(() => {
        useLocalizedPrice.restore();
    });

    it('renders price', () => {
        // Arrange
        const price: Price[] = [{ locale: 'en-US', amount: 400, currency: Currency.USD }];

        // Act
        render(<PriceComponent price={price} />)

        // Assert
        expect(screen.queryByText('400 $')).toBeInTheDocument();
    })
})