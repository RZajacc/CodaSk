import {describe, expect, it, test} from 'vitest';
import Content from './page';
import {fireEvent, render, screen} from '@testing-library/react';

describe('General document structure', () => {
  it('Should contain a form with attribute data-testid set to loginForm', async () => {
    const LoginPage = await Content();

    render(LoginPage);
  });
});
