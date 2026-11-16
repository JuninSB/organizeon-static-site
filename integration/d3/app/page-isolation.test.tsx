import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Link, Routes, Route } from 'react-router-dom';
import { ServiceRouter, publicHref } from './service-router';
import { PageBoundary } from './page-boundary';
function Broken(): never { throw new Error('Falha de teste da aba'); }
describe('isolamento e navegação de páginas', () => {
 it('mantém login em pathname e abas em hash', () => {
  expect(publicHref('/login')).toBe('/d3/login');
  expect(publicHref('/')).toBe('/d3');
  expect(publicHref('/settings')).toBe('/d3#configuracoes');
 });
 it('mantém navegação disponível quando uma página falha', async () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  window.history.replaceState({}, '', '/d3#estado');
  render(<ServiceRouter><nav><Link to="/logs">Eventos</Link></nav><PageBoundary><Routes><Route path="/" element={<Broken/>}/><Route path="/logs" element={<h1>Eventos funcionando</h1>}/></Routes></PageBoundary></ServiceRouter>);
  expect(await screen.findByRole('heading', { name: 'Um erro ocorreu ao carregar esta página!' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Copiar erro' })).toBeInTheDocument();
  await userEvent.setup().click(screen.getByRole('link', { name: 'Eventos' }));
  expect(await screen.findByRole('heading', { name: 'Eventos funcionando' })).toBeInTheDocument();
  expect(window.location.pathname).toBe('/d3');
  expect(window.location.hash).toBe('#eventos');
 });
});
