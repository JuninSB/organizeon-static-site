# Temas nas telas de autenticação

O D2, D3, D4 e o login do client oferecem botão de sol/lua no cabeçalho do cartão. A troca mantém usuário/senha digitados e persiste no navegador. D2 e D4 usam o mesmo armazenamento de tema dos respectivos painéis (`d2-theme`, `d4-theme`); D3 reaproveita seu serviço de tema (`d3-theme`). O client usa `client-login-theme`, inclusive nos modos de cadastro e código.

Componentes compartilhados: `ui/src/components/layout/theme-toggle.tsx` (botão sem envio do formulário) e `brand-mark.tsx` (marca oficial com variante preta para tema claro). `D2Login` atende aos endpoints 2 e 4; `LoginSurface` atende ao client. D3 usa o mesmo contrato de botão e seu `BrandIcon` existente. Fonte D3 está no pacote `server-backup/organizeon-d3-frontend-source.tar.gz`, correspondente ao worktree de implantação.

O ícone do cabeçalho da sidebar D4 agora acompanha a preferência de tema, corrigindo a marca branca quase invisível no fundo claro. Não foram alteradas autenticação, permissões, configurações de SMTP ou regras de envio.

Validação: TypeScript e builds client/admin, D3 e D4 passaram; treze testes de distribuição passaram. `ui/e2e/login-themes.cjs` verificou os quatro logins compilados em viewport mobile: alternância, persistência após reload, estado do campo e marca preta visível, sem overflow ou erros de página. Capturas do navegador foram inspecionadas. Não houve teste em aparelho físico. O Chromium desta sessão precisou de uma instância por tela, pois fechar um contexto no modo single-process encerrava a instância; o teste foi ajustado e repetido.

Publicação de arquivos estáticos sem reinício de serviços. Código `d9ffa51`, distribuição `5afbf47`, Pages `44089024920` concluído. SHA-256 dos quatro bundles públicos client/admin conferidos. D2 usa revisão `login-theme-5afbf47`; D3 e D4 recebem assets preservando hashes anteriores e index atômico.

Após a publicação, a mesma verificação de navegador passou novamente nos quatro logins usando os arquivos públicos, sem interceptação dos bundles. Preferência, formulário e contraste da marca conferidos também nessa etapa.

Rollback: `~/organizeon/backend/staging/login-themes-20261117-100435/` guarda índices anteriores D3/D4, login D3 e template D2. Restaurar índices/template e, se necessário, o fonte de login; não remover assets antigos. Backend principal, D3, D4 e tmux Xiaomi mantiveram seus processos durante a publicação.

## Mesclagem dos ícones

As versões clara/escura da marca agora permanecem montadas e sobrepostas no mesmo espaço, com carregamento eager e decode antecipado. A troca de tema altera somente a opacidade, em 200 ms. Sol e lua também permanecem no mesmo botão e fazem crossfade. Isso elimina a troca de `src` e a recriação dos ícones a cada clique; a gestão física da memória continua sendo do navegador. Movimento reduzido é respeitado.

Aplicação: logins/client e cabeçalhos D2/D4 usam componentes compartilhados; D3 adapta a marca existente para grid sobreposto e opacidade. O teste de navegador confirma duas imagens carregadas, referências DOM/src preservadas e ambas parcialmente visíveis durante a transição. TypeScript, os três builds de interface e treze testes de distribuição passaram. Código `8d53b23`, distribuição `9ce75fa`; rollback em `~/organizeon/backend/staging/icon-fade-20261117-101422/`. Somente arquivos estáticos foram publicados.

Validação pública concluída nos quatro logins, incluindo retenção dos SVGs e preferência de movimento reduzido. Pages `44090744576` concluído; hashes dos quatro bundles client/admin públicos conferidos. D2 usa revisão `icon-fade-9ce75fa`. Os processos backend, D3, D4 e a sessão Xiaomi permaneceram ativos. Uma primeira amostragem temporal do D3 não capturou a fase intermediária; a repetição completa passou. Teste realizado em Chromium mobile emulado, sem aparelho físico.
