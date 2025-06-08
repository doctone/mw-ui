import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { server } from '../../mocks/node';
import { http, HttpResponse } from 'msw';

describe('App.tsx', () => {
  it('renders correctly', () => {
    render(<App />);
    expect(screen.getByText('Use the search to find vehicles')).toBeVisible();
  });

  it('allows the user to search for tags', async () => {
    const user = userEvent.setup();
    const paramsSpy = vi.fn();

    server.use(
      http.get('http://localhost:8000/api/tags', () => {
        return HttpResponse.json(['red']);
      }),
      http.get('http://localhost:8000/api/cars', ({ request }) => {
        const url = new URL(request.url);
        const tag = url.searchParams.get('tag');
        paramsSpy(tag);
        return HttpResponse.json({ cars: [] });
      })
    );

    render(<App />);

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'red');
    const option = await screen.findByRole('option', { name: 'red' });
    expect(option).toBeVisible();
    await user.click(option);
    expect(paramsSpy).toHaveBeenCalledWith('red');
  });
});
