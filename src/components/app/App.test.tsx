import { describe, expect, it } from 'vitest';
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

  it('renders a default message when no cars are returned', async () => {
    const user = userEvent.setup();

    server.use(
      http.get(`${BASE_URL}/api/tags`, () => {
        return HttpResponse.json(['ferrari']);
      }),
      http.get(`${BASE_URL}/api/cars`, () => {
        return HttpResponse.json({
          cars: [],
        });
      })
    );

    render(<App />);

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'ferrari');

    const option = await screen.findByRole('option', { name: 'ferrari' });
    await user.click(option);

    await expect(screen.findByText('No cars to display')).resolves.toBeInTheDocument();
    expect(screen.queryAllByRole('img')).toHaveLength(0);
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
            { id: '1', url: 'http://example.com/car1', alt_description: 'car1' },
            { id: '2', url: 'http://example.com/car2', alt_description: 'car1' },
            { id: '3', url: 'http://example.com/car3', alt_description: 'car1' },
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
