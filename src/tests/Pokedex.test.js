import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../pages';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

beforeEach(() => {
  renderWithRouter(<Pokedex
    pokemonList={ pokemonList }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);
});

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const heading = screen.getByRole('heading', { name: 'Encountered Pokémon', level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    const namePokemon = screen.getByText(/Pikachu/i);
    expect(namePokemon).toBeInTheDocument();
    expect(namePokemon).toHaveTextContent('Pikachu');

    const nextPokemon = screen.getByRole('button', { name: 'Próximo Pokémon' });
    userEvent.click(nextPokemon);
    const namePokemon2 = screen.getByText(/Charmander/i);
    expect(namePokemon2).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    const pokemonQuantity = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonQuantity).toHaveLength(7);
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const buttonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(buttonAll);
    expect(buttonAll).toBeValid();
    expect(buttonAll).toBeInTheDocument();
    expect(buttonAll).toContainHTML('All');
  });

  test('A Pokedéx deverá mostrar os Pokémon normalmente (sem filtros) quando o botão All for clicado', () => {
    const btnAll = screen.getByRole('button', { name: 'Electric' });
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
    const pokeName = screen.getByText('Pikachu');
    expect(pokeName).toBeInTheDocument();
  });

  test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', () => {
    <Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />;
    const fireButton = screen.getByRole('button', { name: /fire/i });
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    const allPokemons = screen.getByRole('button', { name: /all/i });
    const pokemonsFireType = pokemonList.filter(({ type }) => type === 'Fire');

    expect(fireButton).toBeInTheDocument();
    userEvent.click(fireButton);

    pokemonsFireType.forEach(({ name }) => {
      expect(screen.getByTestId('pokemon-name').innerHTML).toBe(name);
      expect(screen.getByTestId('pokemon-type').innerHTML).toBe(fireButton.innerHTML);
      userEvent.click(nextPokemon);
    });

    userEvent.click(allPokemons);

    pokemonList.forEach(({ name }, index) => {
      if (index === 8) {
        userEvent.click(nextPokemon);
        expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
      } else {
        expect(screen.getByText(name)).toBeInTheDocument();
        userEvent.click(nextPokemon);
      }
    });
  });
});
