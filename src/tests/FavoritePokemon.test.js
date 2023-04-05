import { screen } from '@testing-library/react';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

beforeEach(() => renderWithRouter(<FavoritePokemon />));

describe('Teste o componente <FavoritePokemon.js />', () => {
  test('Ao favoritar a partir da página de detalhes: Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    const textNotFavorite = screen.getByText('No favorite Pokémon found');
    expect(textNotFavorite).toBeInTheDocument();
  });

  test('Teste se apenas são exibidos os Pokémon favoritados.', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ [pokemonList[0]] } />);
    const favorito = screen.getByText('Pikachu');
    expect(favorito).toBeInTheDocument();
  });
});
