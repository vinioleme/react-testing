import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

beforeEach(() => { renderWithRouter(<App />); });

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    const electricButton = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(electricButton);

    const pokemonName = screen.getByTestId('pokemon-name');
    const typeOfPokemon = screen.getByTestId('pokemon-type');
    const weightPokemon = screen.getByTestId('pokemon-weight');
    const img = screen.getByAltText(/Pikachu sprite/i);
    expect(weightPokemon).toBeInTheDocument();
    expect(weightPokemon).toHaveTextContent('Average weight: 6.0 kg');
    expect(img).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(img).toHaveAttribute('alt', 'Pikachu sprite');
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(typeOfPokemon).toHaveTextContent('Electric');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido;', () => {
    const electricButton = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(electricButton);

    const details = screen.getByRole('link', { name: 'More details' });
    expect(details).toBeInTheDocument();
    expect(details).toHaveAttribute('href', '/pokemon/25');
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon;', () => {
    const electricButton = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(electricButton);

    const detail = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detail);

    const detailTitle = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(detailTitle).toBeInTheDocument();

    const favoriteButton = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favoriteButton);
    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
