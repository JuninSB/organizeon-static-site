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

## Resultado da entrega — 16/11/2026

- Backend: 30 testes passaram; os sete testes específicos de DMs também passaram no Android real, em staging isolado.
- Interface compartilhada: 10 testes passaram. O primeiro executor em processos separados sofreu timeout na inicialização; repetição com `--pool=vmThreads --maxWorkers=1` passou integralmente.
- D3: nove testes passaram. Builds do cliente, admin e D3 passaram; TypeScript validado.
- Integridade do cliente/manifest/download: 13 testes passaram.
- Playwright com backend real em memória: solicitação, aceite, envio/recebimento, @ no cursor, resposta por gesto, segurar para ações, notificações X/Abrir, voltar/fechar por gesto e alternância 390/1280 px passaram. Capturas mobile e desktop inspecionadas. A alternância revelou e corrigiu a sidebar mobile que permanecia aberta atrás das DMs.
- Regressão de perfil: cliente e D2 passaram, incluindo transporte Bearer, edição parcial, cancelamento e recorte da foto.
- Assets públicos conferidos por SHA-256. D2/D3 login responderam 200 pelo servidor. API de DMs sem sessão respondeu 401.
- Não foram enviadas mensagens para contas reais. Permissão/entrega de notificações do sistema, som físico e comportamento de todos os teclados Android não foram validados em aparelho físico.

### Recuperação desta instalação

No servidor, os arquivos pequenos de rollback estão em `~/organizeon/backend/staging/`:

- `dm-rollback.path` informa a pasta com o `server.mjs` anterior. Restaurar esse arquivo e reiniciar apenas `organizeon-backend` reverte as rotas novas; preservar o SQLite privado.
- `d2-before-dm-f0f34bf.html` contém o template anterior do D2.
- `d3-dm-rollback-20261116-115522/` contém índice e fontes anteriores do D3. Os hashes antigos dos assets foram preservados, permitindo restaurar o índice sem apagar assets.
- Git mantém commits separados de fontes e bundles. Reverter os commits correspondentes e publicar novamente restaura o cliente. Nenhum backup integral foi recriado.

## Refinamento de interação — 16/11/2026

A pesquisa da conversa começa oculta. A lupa no cabeçalho abre o campo e os filtros; fechar pela lupa/X ou Escape limpa os filtros e restaura o histórico. A pesquisa da lista de conversas permanece independente.

O menu ao segurar uma mensagem usa `components/ui/drawer.tsx` e `drawer.css`, com o Drawer nativo da Base UI: movimento acompanhando o toque, cancelamento de arraste curto, fechamento ao puxar para baixo, Escape, clique fora e botão de fechar. As ações aguardam a saída do modal antes de focar o compositor ou abrir outro diálogo. Os grupos seguem a referência visual, e o menu preserva seu conteúdo durante a animação de saída.

| Ação | Comportamento |
| --- | --- |
| Reagir | Alterna a reação da própria conta; o total é compartilhado. |
| Editar mensagem | Abre a edição do texto da própria mensagem. |
| Responder | Prepara uma resposta com referência à mensagem original. |
| Encaminhar | Seleciona outra conversa e envia uma cópia marcada como encaminhada. |
| Copiar texto | Copia o texto para a área de transferência. |
| Marcar como não lida | Marca a conversa a partir dessa mensagem para a própria conta. |
| Fixar / desafixar | Gerencia as mensagens fixadas para os participantes da conversa. |
| Salvar / remover dos salvos | Gerencia os favoritos pessoais da conta. |
| Apagar mensagem | Pede confirmação antes de apagar a própria mensagem para os participantes. |

Referências consultadas: [Drawer Base UI](https://base-ui.com/react/components/drawer), [respostas](https://support.discord.com/hc/en-us/articles/360057382374-Replies-FAQ), [fixadas](https://support.discord.com/hc/en-us/articles/221421867-Pin-Messages-FAQ), [salvos e lembretes](https://support.discord.com/hc/en-us/articles/26442819646999-Message-Bookmarks-and-Reminders), [encaminhamento](https://support.discord.com/hc/en-us/articles/24640649961367-Message-Forwarding) e [atalhos para marcar não lida](https://discord.com/blog/how-to-navigate-discord-using-only-your-keyboard).

Em Users, a troca de senha permanece no menu de três pontos de cada conta; o atalho separado foi removido. O fluxo de senha atual/nova/confirmação e as permissões existentes foram preservados.

Validação deste refinamento: TypeScript e builds cliente/admin/D3 passaram; os 10 testes da interface passaram. Playwright validou pesquisa fechada inicialmente, abertura e restauração do histórico, arraste via CDP touch com deslocamento real do painel, fechamento por arraste e por ação, além das regressões de envio, respostas, notificações e navegação mobile/desktop. A troca de senha pelos três pontos passou com confirmação diferente, senha atual incorreta e sucesso com encerramento da sessão fictícia. Captura do menu inspecionada; o ambiente Linux de teste não tem a mesma fonte de emojis do Android.

A validação adicional encontrou uma perda de atualização quando o polling consumia eventos de edição em segundo plano. O store agora mantém as mensagens em cache marcadas como pendentes até recarregá-las com sucesso; esses marcadores são apagados ao sair da conta. Um teste de regressão simula consumir o evento com a página oculta e voltar sem receber o mesmo evento novamente. O compositor também foca o campo de edição depois de montar a instância correta, após a saída do Drawer.

Para executar o teste de navegador em outro checkout, `DM_BACKEND_ROOT` pode apontar para as fontes do backend extraídas do arquivo de recuperação.

## Acabamento visual e Motion

Motion (`motion/react`, com LazyMotion/domAnimation e componentes `m`) está centralizado em `ui/src/core/motion.tsx`. A política global respeita a preferência de movimento reduzido. As trocas de páginas/campos usam AnimatePresence e transições curtas; grupos e reações têm feedback de entrada e toque. A Base UI continua sendo a única responsável pelo arraste e pela saída do Drawer, evitando dois mecanismos disputando o mesmo transform.

O menu agora possui superfícies semânticas `card`, cantos de 18px e divisórias internas depois da coluna de ícones. As linhas usam botões semânticos específicos; a borda do Button genérico não se propaga para cada opção. O título técnico fica acessível a leitores de tela e a linha de reações ganha acesso à preferência de toque duplo.

No celular, o perfil abre em Drawer e usa uma superfície contínua, sem card dentro de outro card. Nome, foto, descrição e troca de senha preservam os contratos e permissões anteriores. As conversas exibem horários reais e pesquisa recolhida por padrão. Mensagens consecutivas próximas são agrupadas, e o recibo aparece somente na última mensagem enviada visível. O cabeçalho da conversa substitui o cabeçalho repetido das DMs em telas pequenas.

Imagens privadas de até 1 MiB carregam quando entram na área visível; mídias maiores continuam sob interação. URLs Blob são revogadas ao sair, e respostas tardias após desmontar não são exibidas. Não houve mudança no backend nem no armazenamento das mensagens.

Validação do Motion: o teste de navegador registrou opacidades intermediárias reais durante a abertura dos grupos, além de verificar o arraste nativo, as ações, o perfil editável, o recorte da foto e a prévia autenticada de imagem. Capturas mobile e desktop foram inspecionadas. Os testes unitários passaram após repetir isoladamente o teste de arquivos D2 que excedeu o prazo durante os builds concorrentes. O lint das fontes do D3 não apresentou erros; há um aviso anterior sobre a cópia deliberada de um Set no store. O lint sem caminho também percorre arquivos gerados/dependências e não deve ser usado para corrigir bibliotecas externas.

A versão final passou também no fluxo completo com `prefers-reduced-motion: reduce`: o Drawer não manteve a transição espacial e os gestos/ações continuaram funcionais. Perfis no cliente e no D2 passaram nos testes de edição, cancelamento e foto. O Drawer oferece `contentClassName` para composições sem padding, evitando sobrepor regras de layout para desenhar o banner até a borda.
