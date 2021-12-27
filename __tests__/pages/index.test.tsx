import React from 'react';
import { render, screen } from '@testing-library/react';
import { DynamicPageContent } from '../../src/models/dynamicPageContent';
import * as nextRouter from 'next/router';
import Home from '../../src/pages/index';
import { StoreService } from '../../src/services/storeService';
import { NextRouter } from 'next/router';

describe('Home page tests', () => {
    let useRouter: jest.SpyInstance;
    let getDynamicPageContent: jest.SpyInstance;

    beforeEach(() => {
        useRouter = jest.spyOn(nextRouter, 'useRouter').mockReturnValue({
            locale: 'en-US',
        } as NextRouter);
        getDynamicPageContent = jest.spyOn(StoreService.prototype, 'getDynamicPageContent');

        const meta: DynamicPageContent = {
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
        render(<Home greetingText='Text1' linkText='Text2' />);

        // Assert
        expect(screen.queryByText('Text1')).toBeInTheDocument();
    });
});