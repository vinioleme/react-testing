import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

beforeEach(() => {
  renderWithRouter(<About />);
});

describe('Teste o componente About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const aboutText = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    expect(aboutText).toBeInTheDocument();
    const aboutText2 = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');
    expect(aboutText2).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const heading = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const paragraph = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    expect(paragraph).toBeInTheDocument();
    const paragraph2 = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');
    expect(paragraph2).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const image = screen.getByAltText(/pokédex/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
