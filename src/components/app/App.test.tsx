import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { BASE_URL, server } from '../../mocks/node';
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
      http.get(`${BASE_URL}/api/tags`, () => {
        return HttpResponse.json(['red']);
      }),
      http.get(`${BASE_URL}/api/cars`, ({ request }) => {
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
    await expect(screen.findByText('Search results for : red')).resolves.toBeInTheDocument();
  });

  it('renders car images when search results are returned', async () => {
    const user = userEvent.setup();

    server.use(
      http.get(`${BASE_URL}/api/tags`, () => {
        return HttpResponse.json(['ferrari']);
      }),
      http.get(`${BASE_URL}/api/cars`, () => {
        return HttpResponse.json({
          cars: [
            { id: '1', url: 'http://example.com/car1' },
            { id: '2', url: 'http://example.com/car2' },
            { id: '3', url: 'http://example.com/car3' },
          ],
        });
      })
    );

    render(<App />);

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'ferrari');

    const option = await screen.findByRole('option', { name: 'ferrari' });
    await user.click(option);

    expect(await screen.findByText('Search results for : ferrari')).toBeInTheDocument();

    const images = await screen.findAllByRole('img');
    expect(images).toHaveLength(3);

    expect(images[0]).toHaveAttribute('src', 'http://example.com/car1.jpg');
    expect(images[1]).toHaveAttribute('src', 'http://example.com/car2.jpg');
    expect(images[2]).toHaveAttribute('src', 'http://example.com/car3.jpg');

    const pictures = document.querySelectorAll('picture');
    expect(pictures.length).toBe(3);

    const sources = document.querySelectorAll('source');
    expect(sources[0]).toHaveAttribute('srcSet', 'http://example.com/car1.webp');
    expect(sources[1]).toHaveAttribute('srcSet', 'http://example.com/car2.webp');
    expect(sources[2]).toHaveAttribute('srcSet', 'http://example.com/car3.webp');
  });
});
