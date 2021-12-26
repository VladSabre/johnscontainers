import { render, screen } from '@testing-library/react';
import { Layout } from '../../src/components/layout';
import * as Context from '../../src/context/appContext';
import { AppStore } from '../../src/context/appStore';
import { ConfigCulture } from '../../src/models/configCulture';
import { ProductCardModel } from '../../src/models/productCardModel';
import { ConfigHelper } from '../../src/services/configHelper';

describe('Layout component tests', () => {
    let useRouter: jest.SpyInstance;
    let useContext: jest.SpyInstance;
    let addToCart: jest.Mock<void, [product: ProductCardModel]>;
    let removeFromCart: jest.Mock<void, [id?: number | undefined]>;

    beforeEach(() => {
        useRouter = jest.spyOn(require('next/router'), 'useRouter');
        useContext = jest.spyOn(Context, 'useAppContext');
        addToCart = jest.fn((_product: ProductCardModel) => { });
        removeFromCart = jest.fn((_id?: number) => { });
    });

    afterEach(() => {
        useRouter.mockReset();
        useContext.mockReset();
        addToCart.mockReset();
        removeFromCart.mockReset();
    });

    const mockContext = () => {
        const store: AppStore = {
            cart: {
                items: [],
                total: 30
            },
            addToCart: addToCart,
            removeFromCart: removeFromCart
        };
        useContext.mockReturnValue(store);
    };

    it('renders header', () => {
        // Arrange
        mockContext();

        // Act
        render(<Layout><div>testtest</div></Layout>)

        // Assert
        expect(screen.queryByText('John\'s containers')).toBeInTheDocument();
        expect(screen.queryByText('testtest')).toBeInTheDocument();
    });

    it('goes to home page', () => {
        // Arrange
        mockContext();

        const push = jest.fn((_path: string) => { });

        useRouter.mockImplementationOnce(() => ({
            push: push
        }))

        // Act
        render(<Layout><div>testtest</div></Layout>);
        screen.getByText('John\'s containers').click();

        // Assert
        expect(push.mock.calls.length).toBe(1);
        expect(push.mock.calls[0][0]).toBe('/');
    });

    it('goes to cart page', () => {
        // Arrange
        mockContext();

        const push = jest.fn((_path: string) => { });

        useRouter.mockImplementationOnce(() => ({
            push: push
        }))

        // Act
        render(<Layout><div>testtest</div></Layout>);
        screen.getByTitle('cart').click();

        // Assert
        expect(push.mock.calls.length).toBe(1);
        expect(push.mock.calls[0][0]).toBe('/cart');
    });

    it('changes region', () => {
        // Arrange
        mockContext();

        const pathname = 'path';
        const asPath = 'aspath';

        const culture: ConfigCulture = {
            Name: 'USA',
            Store: 'usa',
            CountryCode: 'us',
            CultureCode: 'en-US',
            CurrencyCode: 'USD',
            Label: 'US'
        }

        const languageLabel = 'US';
        const setLanguageLabel = jest.fn((_state: React.SetStateAction<string>) => { });

        const push = jest.fn((_path: string, _asPath: string, _options: { locale: string }) => { });

        jest.spyOn(ConfigHelper.prototype, 'getDefaultLocale').mockReturnValue(culture.CultureCode);
        const getNextRegion = jest.spyOn(ConfigHelper.prototype, 'getNextRegion').mockReturnValue(culture);
        const getRegion = jest.spyOn(ConfigHelper.prototype, 'getRegion').mockReturnValue(culture);

        useRouter.mockImplementationOnce(() => ({
            push: push,
            pathname: pathname,
            asPath: asPath,
        }))

        jest.spyOn(require('react'), 'useState').mockReturnValue([languageLabel, setLanguageLabel]);

        // Act
        render(<Layout><div>testtest</div></Layout>);
        screen.getByText(languageLabel).click();

        // Assert

        expect(getRegion.mock.calls.length).toBe(1);
        expect(removeFromCart.mock.calls.length).toBe(1);
        expect(getNextRegion.mock.calls.length).toBe(1);
        //expect(setLanguageLabel.mock.calls.length).toBe(1);
        expect(push.mock.calls.length).toBe(1);
        expect(push.mock.calls[0][0]).toBe(pathname);
        expect(push.mock.calls[0][1]).toBe(asPath);
    });
})