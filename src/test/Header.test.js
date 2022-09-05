import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './utils/renderWithRouterAndRedux';

describe('Testes no componente Header', () => {
  it('Testa os clicks nos botões', () => {
    const emailPerson = JSON.stringify({ email: 'test@test.com' });
    localStorage.setItem('user', emailPerson);

    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    const btnProfile = screen.getByTestId('profile-top-btn');
    expect(btnProfile).toBeInTheDocument();
    userEvent.click(btnProfile);

    localStorage.clear();
  });

  it('Teste se o input de busca aparece na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    const btnSearch = screen.getByTestId('search-top-btn');
    userEvent.click(btnSearch);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });
  it('Teste se o input de busca não aparece na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    const btnSearch = screen.getByTestId('search-top-btn');
    userEvent.click(btnSearch);

    const input = screen.getByTestId('search-input');
    userEvent.type(input, 'chicken');

    history.push('/favorite-recipes');

    const btnProfile = screen.getByTestId('profile-top-btn');
    expect(btnProfile).toBeInTheDocument();

    history.push('/drinks');
    history.push('/done-recipes');
  });
});
