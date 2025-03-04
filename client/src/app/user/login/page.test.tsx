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
  beforeEach(async () => {
    const LoginPage = await Content();

    render(LoginPage);
  });

  it('renders a level one header', async () => {
    const heading = screen.getByRole('heading', {level: 1});

    expect(heading).toBeInTheDocument();
  });

  it('renders a LoginForm on the page', async () => {
    const loginFrom = screen.getByTestId('login-form');

    expect(loginFrom).toBeInTheDocument();
  });

  it('renders a link element nested in paragraph', async () => {
    // Check if paragraph is rendered
    const paragraph = screen.getByRole('paragraph');
    expect(paragraph).toBeInTheDocument();

    // Check if link is rendered
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();

    // Check if the link is nested in parapgraph
    expect(paragraph).toContainElement(link);

    // Check if link has an href attribute with proper value
    expect(link).toHaveAttribute('href', '/user/register');

    // Check if the link has a proper text
    expect(link).toHaveTextContent("Don't have an account yet? sign up!");
  });

  it('renders an image', async () => {
    // Check if image element is rendered
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();

    // Check if the image has a proper alt value
    expect(image).toHaveAttribute('alt', 'green-cloud');
  });
});
