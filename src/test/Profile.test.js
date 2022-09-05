import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './utils/renderWithRouterAndRedux';

describe('Testes do componente Profile', () => {
  it('Testa se ao clicar nos botões a página Done é renderizada', async () => {
    const emailPerson = JSON.stringify({ email: 'testando@test.com' });
    localStorage.setItem('user', emailPerson);

    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/profile');

    const user = await screen.findByText('testando@test.com');
    expect(user).toBeInTheDocument();

    const btnDone = screen.getByTestId('profile-done-btn');
    userEvent.click(btnDone);

    localStorage.clear();
  });

  it('Testa se ao clicar nos botões a página Favorite é renderizada', () => {
    const emailPerson = JSON.stringify({ email: 'test@test.com' });
    localStorage.setItem('user', emailPerson);

    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/profile');

    const btnDone = screen.getByTestId('profile-favorite-btn');
    userEvent.click(btnDone);

    localStorage.clear();
  });

  it('Testa se ao clicar nos botões a página Login é renderizada', () => {
    const emailPerson = JSON.stringify({ email: 'test@test.com' });
    localStorage.setItem('user', emailPerson);

    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/profile');

    const btnDone = screen.getByTestId('profile-logout-btn');
    userEvent.click(btnDone);

    localStorage.clear();
  });
});
