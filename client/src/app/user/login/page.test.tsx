import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Content from './page';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe('Login component', () => {
  // Ensure the async component is rendered at each test
  beforeEach(() => {
    render(<Content />);
  });

  it('renders a level one header with correct text', () => {
    const heading = screen.getByRole('heading', {level: 1});

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Please log in:');
  });

  it('renders the LoginForm on the page', () => {
    const loginForm = screen.getByTestId('login-form');

    expect(loginForm).toBeInTheDocument();
  });

  it('renders a link nested in a paragraph', () => {
    const paragraph = screen
      .getByText(/Don't have an account yet\?/i)
      .closest('p');

    // Check if paragraph is present
    expect(paragraph).toBeInTheDocument();

    const link = screen.getByRole('link', {name: /sign up/i});

    // Check for link presence and correct attributes
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/user/register');
    expect(paragraph).toContainElement(link);
  });

  it('renders an image with correct alt text', () => {
    const image = screen.getByRole('img', {name: 'green-cloud'});

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'green-cloud');
  });
});
