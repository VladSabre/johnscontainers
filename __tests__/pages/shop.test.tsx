import { render, screen } from '@testing-library/react'
import Shop from '../../src/pages/shop'
import { StoreService } from '../../src/services/storeService';
import { ProductCardModel } from '../../src/models/productCardModel';
import { Currency } from '../../src/models/currency';
import { DynamicPageContet } from '../../src/models/DynamicPageContet';

describe('Shop page tests', () => {
    let useRouter: jest.SpyInstance;
    let getDynamicPageContent: jest.SpyInstance;

    beforeEach(() => {
        useRouter = jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({ locale: 'en-US' });
        getDynamicPageContent = jest.spyOn(StoreService.prototype, 'getDynamicPageContent');

        const meta: DynamicPageContet = {
            description: 'description'
        };

        getDynamicPageContent.mockReturnValue(meta);
    });

    afterEach(() => {
        useRouter.mockRestore();
        getDynamicPageContent.mockRestore();
    });

    it('renders a greeting', () => {
        const metaTags = {
            title: 'title'
        }

        const products: ProductCardModel[] = [
            {
                id: 1,
                name: 'Lol1',
                image: '/image',
                isInStock: true,
                price: [{
                    locale: 'en-US',
                    amount: 400,
                    currency: Currency.USD
                }]
            },
            {
                id: 2,
                name: 'LolLol2',
                image: '/image',
                isInStock: false,
                price: [{
                    locale: 'en-US',
                    amount: 600,
                    currency: Currency.USD
                }]
            }
        ];
        render(<Shop metaTags={metaTags} products={products} />)

        expect(screen.queryByText('Lol1')).toBeInTheDocument();
        expect(screen.queryByText('LolLol2')).toBeInTheDocument();
    })
})