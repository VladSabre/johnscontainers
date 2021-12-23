import { render, screen } from '@testing-library/react'
import Home from '../../src/pages/index'

describe('Home page tests', () => {
    it('renders a greeting', () => {
        // Act
        render(<Home greetingText='Text1' linkText='Text2' />)

        // Assert
        expect(screen.queryByText('Text1')).toBeInTheDocument();
    })
})