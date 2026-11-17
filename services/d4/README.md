# OrganizeOn D4 — e-mail

Aplicação em `https://organizeon.com.br/d4/`. Login em `/d4/login`, navegação interna por hash. Contas OrganizeOn com cargo `ultra_admin`, `super_admin` ou `owner`. Cada conta possui seus próprios endereços, mensagens, anexos e configuração de envio. Não há limite artificial de quantidade de caixas; disco do Android e cotas da Cloudflare continuam finitos.

Estado atual: SMTP fixado na Brevo e gerenciado pelo servidor. A aba Configurações foi removida; `#/settings` redireciona para `#/inbox`. Alterações pela API de configurações são recusadas com 405. Configurações antigas por usuário são ignoradas na seleção do transporte; os outros adaptadores descritos abaixo são históricos e não podem ser selecionados na aplicação.

## Estrutura

- Frontend: repositório organizeon-static-site, `ui/src/d4/` (React/TypeScript, componentes compartilhados de sidebar, login, perfil, mensagens, botões, formulários e portal). Páginas carregadas sob demanda e isoladas por boundary.
- Gateway: `backend/src/d4-gateway.mjs`. Reutiliza autenticação, assinaturas de sessão, expiração/revogação, rate limit do login e usuários do backend existente. Cookie D4 Secure, HttpOnly, SameSite=Strict e Path=/d4/. Verificação de cargo em todas as APIs de e-mail.
- Serviço Python: `~/organizeon/d4/backend`, somente `127.0.0.1:8340`. Configuração privada e SQLite em `~/.local/share/organizeon/d4/`. Nunca expor essa porta diretamente.
- Recebedor Cloudflare: `worker/email.js`, Worker `organizeon-d4-mail`. Catch-all encaminha para o Worker; caixas inexistentes são rejeitadas quando backend disponível. Endereços existentes permanecem exclusivos da conta que os criou.
- Fila Workers KV: namespace `organizeon-d4-mail-pending`. Persiste MIME bruto antes da entrega HTTPS assinada ao Android. Cron a cada cinco minutos tenta até dez itens por execução. Mensagem entregue é removida da fila. Repetições são deduplicadas no SQLite pelo destinatário+MIME. Endereços e corpo não aparecem em logs.

## Recebimento

MX Cloudflare → Email Worker → fila KV → `https://organizeon.com.br/d4/api/inbound` pelo túnel existente → gateway → serviço localhost → SQLite WAL. Assinatura HMAC cobre timestamp, caminho/query e SHA-256 do corpo. Janela de cinco minutos. O gateway adiciona credencial interna independente e ignora cabeçalhos de identidade externos. O código de ingestão não é uma API de leitura de caixas.

Os registros MX, SPF e DKIM de Email Routing foram comparados pela API, incluindo a concatenação correta dos fragmentos TXT do DKIM. Não confundir DKIM/SPF de Routing com habilitação de Email Sending.

Cada mensagem recebe parsing MIME pelo módulo email da biblioteca padrão. Há texto, HTML isolado por iframe sandbox/CSP sem scripts, imagens remotas ou formulários, anexos para download com nosniff, download de MIME original, pesquisa e paginação. A leitura marca a mensagem como lida.

## Envio real

Brevo é o transporte padrão de todas as contas, inclusive contas futuras. O remetente é sempre derivado de uma caixa pertencente ao usuário autenticado; o navegador não pode forjar o endereço remetente. A chave é lida somente do arquivo privado `~/.local/share/organizeon/d4/config/brevo-smtp.key` e não é gravada nas configurações de cada usuário, no Git ou nos assets.

Quatro transportes independentes:

0. Brevo: `smtp-relay.brevo.com:587`, STARTTLS obrigatório com validação de certificado e autenticação gerenciada pelo servidor. Configuração padrão, sem chave no frontend.

1. SMTP direto: resolve MX e conecta pela porta 25. Tenta outro MX apenas em falha de conexão anterior ao envio. Usa STARTTLS quando oferecido. A aceitação depende da rede e do servidor destinatário.
2. SMTP externo: host, porta, STARTTLS/TLS, usuário e senha por conta. Senha não é retornada pela API. O provedor precisa permitir os remetentes @organizeon.com.br usados.
3. Cloudflare SMTP: `smtp.mx.cloudflare.net:465`, TLS, credencial em arquivo privado do serviço. Exige domínio habilitado em Email Sending; o D4 funciona para recebimento mesmo sem isso.

Não há reenvio automático após DATA nem após resultado incerto. Mensagens ficam em `sending` durante envio; somente aceitação SMTP confirmada coloca em Enviados. Erros/rejeições/entrega parcial vão para Falhas de envio com resultado real por destinatário. Um reinício durante envio marca resultado como incerto e não tenta novamente. Rascunhos têm salvamento explícito; anexos de saída até 10 MB, máximo vinte arquivos e vinte destinatários; recebimento até 20 MB. O limite existe para memória do Android e limite de valor KV, não para quantidade de caixas.

Resultados distinguem `accepted`, `rejected`, `failed`, `partial` e `uncertain`, com fase da falha, código SMTP e comprovante de aceitação após DATA. Uma desconexão em QUIT não desfaz uma aceitação DATA já confirmada. O estado `accepted` significa aceito pelo servidor SMTP, não confirmação universal de leitura ou entrega final. Respostas reais e encaminhamentos com anexos foram testados. Encaminhar preenche o original e seus anexos, pede novo destinatário e salva um rascunho independente.

Respostas preservam In-Reply-To/References quando há Message-ID original e respeitam Reply-To. Pastas: entrada, enviados, rascunhos, falhas e lixeira. Exclusão definitiva somente pela lixeira, incluindo anexos.

## Operação e boot

Serviço runit `organizeon-d4`, dentro do Termux:Boot/termux-services já usado pelos demais serviços:

```
sv status organizeon-d4
sv restart organizeon-d4
sv down organizeon-d4
sv up organizeon-d4
tail -n 80 ~/organizeon/d4/logs/current
```

Logs com rotação svlogd (2 MB, cinco arquivos). SQLite usa WAL, conexões curtas e transações. Estado e segredos privados, umask 077; não incluir em Git ou backups públicos. Credencial Cloudflare em `~/.local/share/organizeon/d4/config/cloudflare-token.txt`, segredo de ingestão em `inbound.key`, credencial localhost em `internal.key`. Para backup, usar `sqlite3.Connection.backup`, nunca copiar só o arquivo principal de uma base WAL ativa. Restaurar junto com os anexos, que estão no próprio SQLite.

## Build e publicação

```
cd organizeon-static-site/ui
npm run typecheck
./node_modules/.bin/vite build --config vite.d4.config.ts
```

Resultado em `organizeon-static-site/d4-dist/`. No servidor, copiar para `~/organizeon/d4/frontend/dist`, preservar hashes antigos durante atualizações e publicar `d4.html` como `index.html` por rename atômico. Não é necessário reiniciar backend para alterar somente assets.

`deploy/cloudflare.mjs` lê o token exclusivamente de `/sdcard/lib/cloudflare-token.txt`, cria/reutiliza KV, configura Worker e cron. `--activate` ativa catch-all. Snapshot DNS/regras em `private/cloudflare-before.json`; manter fora do Git. Inicialização Workers.dev necessária foi configurada como `organizeon-services`. O domínio principal e o SSH mantêm seus túneis existentes.

## Rollback

Backend anterior: `~/.local/share/organizeon/rollback/d4-20261117-014129/server.mjs`. Restaurar esse arquivo e reiniciar somente `organizeon-backend` remove as rotas D4. `sv down organizeon-d4` para apenas o novo serviço. Não apagar SQLite ou fila durante rollback. Restaurar catch-all a partir do snapshot privado para interromper entrada no Worker; não remover MX automaticamente. Desabilitar cron apenas depois de resolver mensagens pendentes.

## Verificações

Testes unitários `python -m unittest discover -s tests -v`: endereços únicos, autorização entre contas, MIME e anexos, deduplicação, rascunhos persistentes, rejeição de injeção de cabeçalho, erro SMTP nunca apresentado como enviado. Testes de navegador em `tests/browser.cjs` exercitam o domínio real com sessão de diagnóstico curta guardada somente em arquivo privado, navegação mobile/desktop, caixa postal, configurações, criar/excluir endereço e salvar rascunho. Testes não alteram senha, cargo ou sessão de outras contas.

Uma mensagem externa real enviada para `organizeon@organizeon.com.br` chegou à caixa, comprovando MX→Worker→túnel→SQLite. A tentativa SMTP da Cloudflare autenticou, mas o servidor respondeu `550 5.7.1 Email sending is not enabled for domain organizeon.com.br`; foi registrada como falha. Testes de porta 25 no Android para MX de Google e Microsoft não conectaram. Para saída, habilitar o domínio no Email Sending ou informar SMTP externo autorizado. Nenhuma dessas falhas é simulada como sucesso.

Atualização Brevo de 17/11/2026: saída habilitada e verificada com mensagem real, resposta e encaminhamento. STARTTLS retornou 220, autenticação 235, submissões 250. Uma mensagem com anexo retornou pela Cloudflare e teve conteúdo validado por SHA-256. Testes de navegador repetiram o fluxo usando outra caixa do domínio, verificaram In-Reply-To e integridade do anexo encaminhado. O bloqueio anterior do Email Sending da Cloudflare não impede a saída pela Brevo.
