import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const detail = screen.getByRole('link', { name: 'More details' });

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const electricButton = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(electricButton);
    userEvent.click(detail);
    const detailTitle = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(detailTitle).toBeInTheDocument();
    const summary = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(summary).toBeInTheDocument();
    const gameLocations = screen.getByText(/Game Locations of Pikachu/i);
    expect(gameLocations).toBeInTheDocument();
    const gameLocation = screen.getByText(/Kanto Viridian Forest/i);
    expect(gameLocation).toBeInTheDocument();
    const map = screen.getByAltText(/Pikachu location/i);
    expect(map).toBeInTheDocument();
    expect(map).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const electricButton = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(electricButton);
    userEvent.click(detail);
    const map = screen.getByAltText(/Pikachu location/i);
    expect(map).toBeInTheDocument();
    expect(map).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const electricButton = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(electricButton);
    userEvent.click(detail);
    const favoriteButton = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favoriteButton);
    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
