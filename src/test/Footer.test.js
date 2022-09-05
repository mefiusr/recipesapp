import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './utils/renderWithRouterAndRedux';

describe('Testes no componente Footer', () => {
  it('Testa se ao clicar nos botões a página Drinks é renderizada', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    const btnProfile = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(btnProfile);
  });

  it('Testa se ao clicar nos botões a página Foods é renderizada', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks');

    const btnProfile = screen.getByTestId('food-bottom-btn');
    userEvent.click(btnProfile);
  });
});
