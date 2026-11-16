# D3: rotas e isolamento

Fonte de integração para `~/organizeon/d3/frontend/src/app/` no servidor Android. O restante do D3 fica no servidor e não é substituído por este cliente estático.

- Login: `/d3/login`.
- Visão geral: `/d3`.
- Abas: `/d3#historico`, `/d3#eventos`, `/d3#configuracoes`.
- `ServiceRouter` integra o pathname do login e os fragmentos das páginas, incluindo voltar/avançar do navegador.
- `AppShell`, login e páginas são chunks lazy separados. O layout só é carregado após validar a sessão.
- Cada página possui `PageBoundary`. Falhas de renderização ou importação mostram erro, copiar e tentar novamente dentro do conteúdo. Sidebar e navegação permanecem montadas. Erros de API continuam tratados pelos serviços existentes.
- Error boundaries não interrompem loops síncronos infinitos; observadores e ciclos de estado precisam permanecer limitados.
- A autorização continua no backend. Hash e visibilidade não controlam acesso.

Validação no Android: TypeScript, build e testes de isolamento passaram. Teste de navegador: login não requisitou os chunks do dashboard; links geraram hashes corretos. APIs autenticadas foram simuladas no teste do navegador; nenhuma solicitação Xiaomi foi enviada.

Publicação: build em `dist-next`; copiar assets preservando os chunks antigos e substituir `dist/index.html` por rename. O servidor lê os arquivos por requisição, sem restart. Backup de rollback: `~/organizeon/d3/backups/pre-hash-isolation-20261116/index.html`; restaurar o index mantém os chunks antigos disponíveis.
