import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ClientSurface } from './surfaces';

describe('OrganizeOn client surfaces', () => {
  it('switches login modes and submits the selected credential contract', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<ClientSurface type="login" onSubmit={onSubmit} onGuest={vi.fn()} />);

    await user.click(screen.getByRole('tab', { name: 'Código' }));
    await user.type(screen.getByLabelText('Código de login'), 'a1b2c3');
    await user.click(screen.getByRole('button', { name: 'Entrar' }));
    expect(onSubmit).toHaveBeenCalledWith({ mode: 'code', username: '', password: '', loginCode: 'A1B2C3' });

    await user.click(screen.getByRole('tab', { name: 'Criar conta' }));
    expect(screen.getByLabelText('Senha')).toHaveAttribute('autocomplete', 'new-password');
  });

  it('reports rejected login requests inside the form', async () => {
    const user = userEvent.setup();
    render(<ClientSurface type="login" onSubmit={vi.fn().mockRejectedValue(new Error('Credenciais inválidas'))} onGuest={vi.fn()} />);
    await user.type(screen.getByLabelText('Usuário'), 'sample');
    await user.type(screen.getByLabelText('Senha'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Entrar' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Credenciais inválidas');
  });
});
