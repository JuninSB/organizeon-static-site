# Reset de conversas, menu de e-mails e client web

## Reset de DM

A ação laranja aparece no menu da conversa para `ultra_admin`, `super_admin` e `owner`. O backend consulta o cargo atual, exige participação na conversa, confirmação explícita e versões atuais. O modal informa que a remoção vale para ambos.

`POST /dm/conversations/:id/reset` recebe `confirm`, `conversationId`, `expectedLastSeq`, `resetVersion`. Uma transação SQLite remove mensagens, anexos inclusive pendentes, reações, favoritos de mensagens e eventos antigos. Blobs sem referências são removidos; cópias encaminhadas para outras conversas permanecem. A conversa aceita permanece vazia com nova data. Bloqueios e configurações globais da conta são preservados. Backups administrativos anteriores não são apagados pelo botão.

A migração adiciona `dm_conversations.reset_version` com padrão zero. Envios e uploads devem incluir a versão atual; operações de uma versão anterior recebem 409. O frontend invalida cache, rascunho, fila de envio e respostas assíncronas antigas. Polling informa o reset ao outro participante.

## E-mails

Segurar uma linha abre o Drawer compartilhado. Também há botão de opções, menu de contexto e Shift+F10. Usa o atraso configurado da conta (200ms padrão); movimento cancela o gesto para preservar scroll. Ações: abrir, responder/encaminhar quando aplicável, marcar leitura, mover/restaurar, baixar EML e excluir definitivamente na lixeira com confirmação. Mover mantém a pasta atual.

`PATCH /d4/api/messages/:id` aceita `{unread:boolean}` com validação de propriedade no servidor. Os caminhos existentes de pasta e exclusão permanecem.

## /d1/live

O Node existente serve um runtime separado em `~/organizeon/backend/live-client`, acessível em `/d1/live/`. Não é o HTML downloader de `/d1`. `node scripts/build-live-client.mjs [destino]` cria o runtime com base no manifesto atual, exclui kernel/versões de download e gera bootstrap próprio. Todos os módulos, CSS, fontes e engines do client vêm do mesmo domínio. Links externos e favicons de atalhos continuam sendo recursos externos; não há dependência do GitHub para carregar o código da aplicação. A rede ainda determina o tempo de carregamento.

O login usa a autenticação existente em `api.organizeon.com.br`; nada é duplicado. Assets são allowlisted por `live-files.json`, MIME de WASM/JS é explícito, paths privados são bloqueados e workers têm escopo limitado a `/d1/live/`. O endpoint de download `/d1` permanece. Não requer nova porta nem alteração no túnel. Novas publicações do client exigem reconstruir este runtime; não há updater no navegador.

## Validação e publicação

- Backend: 44 testes, também executados no Termux em área isolada.
- D4: 18 testes Python incluindo propriedade e alteração de leitura.
- UI: typecheck, testes de outbox/store/hold; builds client, admin, D3 e D4.
- Playwright: reset com cancelamento e confirmação contra backend SQLite em memória; e-mail com long press/leitura/lixeira/resposta; live login/modo convidado sem assets de runtime do GitHub. Nenhuma conversa real resetada, e-mail enviado ou apagado nesses testes.
- Capturas inspecionadas em largura mobile; não equivale a teste físico em todos os aparelhos ou a teste de cada site externo via proxy.

Backup privado da publicação: `~/organizeon/backend/staging/dm-reset-live-20261117/backup/`. Inclui snapshots SQLite consistentes e código anterior. Rollback: restaurar os arquivos de código afetados e índices anteriores, recarregar apenas backend/D4. A coluna de versão é aditiva; não restaurar bancos antigos sobre novas mensagens. D3/D4 mantêm assets anteriores para sessões abertas. O diretório live pode ser retirado sem afetar downloads ou D2. Xiaomi não é reiniciado.

### Resultado da publicação (17/11/2026)

Código `3379684`, distribuição `7a5fd2e`, GitHub Pages execução `44203813853` concluída com sucesso. Os quatro bundles públicos client/admin tiveram SHA-256 comparado ao build local. D2 usa revisão `dm-reset-7a5fd2e`. O runtime live foi instalado no Android e o teste Playwright passou pelo endereço público, incluindo login, convidado e inicialização do service worker/Scramjet no escopo correto. O menu D4 passou usando bundles públicos, com API de mensagens interceptada por fixtures para evitar alterações reais.

Na instalação D4 é obrigatório publicar `d4-dist/d4.html` como `~/organizeon/d4/frontend/dist/index.html`, que é o fallback servido pelo Python. Somente copiar `d4.html` não atualiza o site. D3 usa o próprio `dist/index.html`.

Após a publicação, D2/D3/D4 login responderam 200; a API privada D4 respondeu 401 sem autenticação. Backend PID6526, D4 PID6525, D3 PID7602 e tmux Xiaomi ativo na checagem final. A coluna `reset_version` foi confirmada no banco **ativo** `~/.local/share/organizeon/direct-messages.sqlite3`; `PRAGMA quick_check` retornou `ok` para DM e e-mail. Os arquivos `~/organizeon/backend/data/direct-messages.sqlite3` e `~/organizeon/d4/data/mail.sqlite3` são legados neste ambiente e não devem ser usados para diagnosticar a aplicação ativa. Snapshots dos bancos ativos, após a migração aditiva, estão no backup com prefixo `active-`.

Foi adicionado teste de sincronização por polling: reset recebido do outro participante limpa o histórico local. O teste não reseta conversas reais. Limite: não foi validado envio de notificações nativas em um telefone físico, nem navegação por todos os serviços externos através do proxy.

Correções posteriores da pesquisa, bancos locais e mensagens de retorno: [SEARCH_RUNTIME.md](SEARCH_RUNTIME.md).
