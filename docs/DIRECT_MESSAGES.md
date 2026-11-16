# Mensagens diretas OrganizeOn

O sistema usa as contas e sessões OrganizeOn existentes. DMs são conversas privadas entre duas contas; nenhum servidor ou canal foi adicionado.

## Código e contratos

- `ui/src/features/messages/`: painel, lista, solicitações, conversa, compositor, mídia, ações, gestos e notificações.
- `ui/src/stores/messages-store.ts`: estado de sessão, rascunhos em memória, polling, sincronização incremental e notificações.
- `ui/src/services/messages-service.ts`: contrato HTTP tipado.
- `ui/src/services/account-api.ts`: transporte autenticado compartilhado com perfis. D2 injeta seu transporte Bearer; D3 utiliza suas rotas e cookies existentes; o cliente utiliza seu token existente.
- `MessagesProvider`: montado no layout autenticado, fora da sidebar mobile. Fechar a sidebar não interrompe notificações. O painel é carregado sob demanda; falhas têm uma fronteira de erro.
- `MessagesLauncher`: botão reutilizado próximo ao perfil no cliente, D2, D3 e painel administrativo.
- Backend: `src/direct-messages/store.mjs` e `http.mjs`, presentes no arquivo de fontes `server-backup/organizeon-backend-source.tar.gz`.
- Sincronização com D3: `node scripts/sync-profile-ui.mjs /caminho/d3/src`; o arquivo de fontes D3 preserva sua composição e inicialização.

## Persistência e acesso

SQLite próprio em `~/.local/share/organizeon/direct-messages.sqlite3`, ou `DM_DATABASE_FILE`. WAL, arquivo 0600 e diretório privado. Não altera o banco de contas, o armazenamento D2 nem a automação Xiaomi. O banco é dado operacional: nunca incluí-lo no Git.

Cada chamada autentica a sessão atual. Conversas, mensagens e anexos exigem participação; edição e exclusão exigem autoria. Mutações validam a origem. Anexos nunca recebem URLs públicas. O armazenamento não é criptografia ponta a ponta: o servidor armazena as mensagens e arquivos.

API: `/827e7h3heuw823eh/dm` (ou prefixo configurado), com aliases `/d2/api/dm` e `/d3/api/dm`. Inclui inbox/cursor, requests, settings, people, conversations/messages/read/typing/attachments, messages/actions e notifications/claim. Os módulos de serviço e handler são os contratos executáveis.

No Android, `backend/data` aponta para armazenamento compartilhado; por isso o banco novo foi instalado no HOME privado do Termux. O banco inicial vazio no caminho antigo ficou inativo.

## Comportamento

Solicitações precisam de aceite, salvo preferência de aceite automático do destinatário. Rejeição aplica espera de 24 horas; bloqueio impede envio. Máximo de 20 solicitações/dia por conta. Envios têm nonce idempotente para evitar duplicação em repetição de falha de rede.

Mensagens suportam resposta, edição, exclusão, reação, encaminhamento, fixação, salvos, não lidas, pesquisa e filtros de mídia/links/arquivos. Clicar no nome insere @ no cursor; avatar abre perfil; somente o próprio perfil é editável. O atalho Chat antigo do Fern foi removido, preservando sua pesquisa e configurações.

No celular: deslizar para esquerda responde; segurar abre ações; deslizar para direita volta à lista e depois fecha. A área considera visualViewport para o teclado. Há alternativas por botões e teclado.

Polling: 5 segundos fechado, 1,8 segundo aberto e 20 segundos em segundo plano. Digitação e presença expiram. Notificações têm Abrir/X, preferências, silenciamento e claim atômico para evitar duplicação entre abas/dispositivos. Notificações de navegador dependem de permissão e página ativa; não há push quando o navegador estiver encerrado.

Arquivos: até 8 MiB por arquivo, quatro anexos por mensagem, 256 MiB por conta e 1 GiB global. MIME é verificado; formatos não reconhecidos são downloads binários. Imagens, vídeos e áudio carregam apenas sob interação e usam URLs Blob revogadas ao desmontar.

## Validação e publicação

Testes de domínio e HTTP cobrem consentimento, bloqueio, idempotência, ACL de terceira conta, autoria, anexos, encaminhamento, notificações, filtros, persistência após reabrir o banco e permissões de arquivo. Foram executados também no Android isoladamente com contas fictícias. `ui/e2e/messages.cjs` usa backend SQLite real em memória e duas contas fictícias, sem enviar DMs reais.

A publicação deve manter backend compatível primeiro, publicar bundles/manifest do cliente, atualizar versão das referências D2 somente após os assets públicos estarem disponíveis e sobrepor assets D3 preservando hashes anteriores. Backup pequeno de `server.mjs` e dos índices/templates permite rollback. Reiniciar somente o serviço da API quando seu código mudar; Xiaomi, SSH, túnel e demais serviços não precisam de reinício.
