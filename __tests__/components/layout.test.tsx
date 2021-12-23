import { render, screen } from '@testing-library/react'
import { Layout } from '../../src/components/layout'
import { Currency } from '../../src/models/currency'
import { Price } from '../../src/models/price'

describe('Layout tests', () => {
    it('renders header', () => {
        // Act
        render(<Layout><div>testtest</div></Layout>)

        // Assert
        expect(screen.queryByText('John\' containers')).toBeInTheDocument();
        expect(screen.queryByText('testtest')).toBeInTheDocument();
    })
})