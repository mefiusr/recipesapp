import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './utils/renderWithRouterAndRedux';

const dataTestIdEmail = 'email-input';
const dataTestIdPass = 'password-input';

describe('Testes do componente Login', () => {
  it('Verifica se os inputs estão na tela', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(dataTestIdEmail);
    const inputPassword = screen.getByTestId(dataTestIdPass);
    expect(inputName).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  it('Testa os requisitos da senha', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(dataTestIdEmail);
    expect(inputName).toBeInTheDocument();

    userEvent.type(inputName, 'email@email.com');

    const inputPassword = screen.getByTestId(dataTestIdPass);
    expect(inputPassword).toBeInTheDocument();

    userEvent.type(inputPassword, '123456');

    const btnLogin = screen.getByTestId('login-submit-btn');
    expect(btnLogin).toHaveAttribute('disabled');

    const inputName2 = screen.getByTestId('email-input');
    userEvent.type(inputName2, 'email@email.com');

    const inputPassword2 = screen.getByTestId('password-input');
    userEvent.type(inputPassword2, '1234567');

    const btnLogin2 = screen.getByTestId('login-submit-btn');
    expect(btnLogin2).not.toHaveAttribute('disabled');
    userEvent.click(btnLogin2);
  });
});
