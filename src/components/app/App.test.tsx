import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App.tsx', () => {
  it('renders correctly', () => {
    render(<App />);
    expect(screen.getByText('Use the search to find vehicles')).toBeVisible();
  });
});
