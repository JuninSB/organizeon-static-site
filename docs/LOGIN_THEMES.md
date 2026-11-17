# Temas nas telas de autenticação

O D2, D3, D4 e o login do client oferecem botão de sol/lua no cabeçalho do cartão. A troca mantém usuário/senha digitados e persiste no navegador. D2 e D4 usam o mesmo armazenamento de tema dos respectivos painéis (`d2-theme`, `d4-theme`); D3 reaproveita seu serviço de tema (`d3-theme`). O client usa `client-login-theme`, inclusive nos modos de cadastro e código.

Componentes compartilhados: `ui/src/components/layout/theme-toggle.tsx` (botão sem envio do formulário) e `brand-mark.tsx` (marca oficial com variante preta para tema claro). `D2Login` atende aos endpoints 2 e 4; `LoginSurface` atende ao client. D3 usa o mesmo contrato de botão e seu `BrandIcon` existente. Fonte D3 está no pacote `server-backup/organizeon-d3-frontend-source.tar.gz`, correspondente ao worktree de implantação.

O ícone do cabeçalho da sidebar D4 agora acompanha a preferência de tema, corrigindo a marca branca quase invisível no fundo claro. Não foram alteradas autenticação, permissões, configurações de SMTP ou regras de envio.

Validação: TypeScript e builds client/admin, D3 e D4 passaram; treze testes de distribuição passaram. `ui/e2e/login-themes.cjs` verificou os quatro logins compilados em viewport mobile: alternância, persistência após reload, estado do campo e marca preta visível, sem overflow ou erros de página. Capturas do navegador foram inspecionadas. Não houve teste em aparelho físico. O Chromium desta sessão precisou de uma instância por tela, pois fechar um contexto no modo single-process encerrava a instância; o teste foi ajustado e repetido.

Publicação de arquivos estáticos sem reinício de serviços. Código `d9ffa51`, distribuição `5afbf47`, Pages `44089024920` concluído. SHA-256 dos quatro bundles públicos client/admin conferidos. D2 usa revisão `login-theme-5afbf47`; D3 e D4 recebem assets preservando hashes anteriores e index atômico.

Após a publicação, a mesma verificação de navegador passou novamente nos quatro logins usando os arquivos públicos, sem interceptação dos bundles. Preferência, formulário e contraste da marca conferidos também nessa etapa.

Rollback: `~/organizeon/backend/staging/login-themes-20261117-100435/` guarda índices anteriores D3/D4, login D3 e template D2. Restaurar índices/template e, se necessário, o fonte de login; não remover assets antigos. Backend principal, D3, D4 e tmux Xiaomi mantiveram seus processos durante a publicação.
