import { render, screen } from '@testing-library/react'
import { DynamicPageContet } from '../../src/models/DynamicPageContet';
import Home from '../../src/pages/index'
import { StoreService } from '../../src/services/storeService';

describe('Home page tests', () => {
    let useRouter: jest.SpyInstance;
    let getDynamicPageContent: jest.SpyInstance;

    beforeEach(() => {
        useRouter = jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({ locale: 'en-US' });
        getDynamicPageContent = jest.spyOn(StoreService.prototype, 'getDynamicPageContent');

        const meta: DynamicPageContet = {
            title: 'title',
            description: 'description'
        };

        getDynamicPageContent.mockReturnValue(meta);
    });

    afterEach(() => {
        useRouter.mockRestore();
        getDynamicPageContent.mockRestore();
    });

    it('renders a greeting', () => {
        // Act
        render(<Home greetingText='Text1' linkText='Text2' />)

        // Assert
        expect(screen.queryByText('Text1')).toBeInTheDocument();
    })
})