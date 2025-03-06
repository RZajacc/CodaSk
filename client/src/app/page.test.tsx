import '@testing-library/jest-dom';
import {screen, render} from '@testing-library/react';
import Content from './page';

describe('Home page', () => {
  beforeEach(async () => {
    // Render a page before each element is tested
    const HomePage = await Content();
    render(HomePage);
  });

  it('renders main gif', () => {
    // Get the image by its identifier
    const image = screen.getByTestId('main-gif');

    expect(image).toBeInTheDocument();
  });

  it('renders main heading with a text', () => {
    const heading = screen.getByRole('heading', {level: 1});

    expect(heading).toBeInTheDocument();

    expect(heading).toHaveTextContent('Welcome to Codask');
  });

  it('renders secondary heading ', () => {
    const heading = screen.getByRole('heading', {level: 2});

    expect(heading).toBeInTheDocument();

    expect(heading).toHaveTextContent('Stuck on a problem? Let us help...');
  });

  it('renders three link elements ', () => {
    const link1 = screen.getByRole('link', {name: 'Search by questions'});
    const link2 = screen.getByRole('link', {name: 'Search by tags'});
    const link3 = screen.getByRole('link', {name: 'Search by modules'});

    expect(link1).toBeInTheDocument();
    expect(link2).toBeInTheDocument();
    expect(link3).toBeInTheDocument();

    expect(link1).toHaveAttribute('href', '/search/questions');
    expect(link2).toHaveAttribute('href', '/search/tags');
    expect(link3).toHaveAttribute('href', '/search/modules');
  });

  it('renders logo at the screen ', () => {
    // Get the image by its identifier
    const image = screen.getByTestId('codask-logo');

    expect(image).toBeInTheDocument();
  });

  it('renders text displayed as code ', () => {
    const text = screen.getByRole('code');

    expect(text).toBeInTheDocument();

    expect(text).toHaveTextContent('Happy learning and happy coding!');
  });
});
