import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const favoritePokemon = 'Favorite Pokémon';
beforeEach(() => {
  renderWithRouter(<App />);
});

describe('Testa se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
  test('O primeiro link deve possuir o texto home', () => {
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(4);

    expect(links[0]).toHaveTextContent('Home');
    expect(links[0]).toBeInTheDocument();

    expect(links[1]).toHaveTextContent('About');
    expect(links[1]).toBeInTheDocument();

    expect(links[2]).toHaveTextContent(favoritePokemon);
    expect(links[2]).toBeInTheDocument();

    expect(links[3]).toHaveTextContent('More details');
    expect(links[3]).toBeInTheDocument();
  });

  test('Testa de a aplicação é direcionada para a pagina inicial ao clicar no link home', () => {
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);
    const pokedex = screen.getByRole('heading', { name: /pokédex/i });
    expect(pokedex).toBeInTheDocument();
  });

  test('Testa se a aplicação é direcionada para a página About ao clicar no link about', () => {
    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);
    const aboutText = screen.getByText(/This application simulates a Pokédex/i);
    const aboutH2 = screen.getByRole('heading', { name: /about pokédex/i });
    expect(aboutText).toBeInTheDocument();
    expect(aboutH2).toBeInTheDocument();
  });

  test('Testa se a aplicação é direcionada para a página Favorite Pokémons ao clicar no link favorite pokémons', () => {
    const favorite = screen.getByRole('link', { name: favoritePokemon });
    expect(favorite).toBeInTheDocument();
    expect(favorite).toHaveAttribute('href', '/favorites');
    userEvent.click(favorite);
  });

  test('Testa se a aplicação é direcionada para  a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pagina-nao-existe');
    });
    const notFound = screen.getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
